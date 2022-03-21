import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Form } from 'reactstrap'

import { handleStartEditing, initNormalForm } from '@redux/actions/normalForm'
import BreadCrumbs from '@components/breadcrumbs'

import { preSubmit } from '@components/preSubmit/preSubmit'
import { ActionButtons } from '@components/actionButtons/ActionButtons'
import { setErrors, setSchema } from '@redux/actions/formValidator'
import { FileContext } from '@context/FileContext'
import { validate } from '@utility/formValidator/ValidationTypes'
import { RepeaterScreen } from './RepeaterScreen'
import { DocScreen } from './DocScreen'
import { MkDir } from '@helpers/Axios/MkDir'
import { fetch } from '../utility/helpers/Axios/fetch'
import { SelectorComponent } from '../utility/helpers/selectorComponent'


export const FormScreen = (props) => {

    const { title, endPoint, form: { form, docColumns } } = props
    const { base, structure, errors, repeaters, autoincrement, documents } = form

    const history = useHistory()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { normalForm, formValidator, fileUpload } = useSelector(state => state)
    const { upload, filePath } = fileUpload

    const [file, setFile] = useState([])

    const breadCrumTitle = (id) ? `Editar ${title}` : `Añadir ${title}`

    useEffect(() => {
        if ( id ) dispatch(handleStartEditing(endPoint, id))
        dispatch(initNormalForm(structure))
        dispatch(setSchema(errors))
    }, [initNormalForm])

    const submit = async (e) => {
        e.preventDefault()
        const errors = validate(formValidator.schema, normalForm)
  
        if (Object.keys(errors).length) {
            dispatch(setErrors(errors))
        } else {

            /*
            if (documents) {
                const filePath2 = !normalForm['filePath'] ? await MkDir(endPoint, filePath) : normalForm['filePath']
                normalForm['documents'] = await preSubmit(filePath2, upload, file, normalForm['documents'])
                normalForm['filePath'] = filePath2
            }*/
            fetch(endPoint, id, { ...normalForm }, 'POST')
            history.goBack()
        }
    }

    return (
        <>
            <BreadCrumbs breadCrumbTitle={breadCrumTitle} breadCrumbParent={title} />
            <Form onSubmit={submit}>
                <div className="card">
                    <div className=" card-body row pb-3 px-3">
                        {
                            base && base.map((e, index) => {
                                const clase = `mt-2 col-${e.col[1]} col-xs-${e.col[0]} col-md-${e.col[1]} col-lg-${e.col[2]}`
                                const Component = SelectorComponent(e)
                                return <Component {...e} key={index} containerClassname={clase} />
                            })
                        }
                    </div>
                </div>
                {
                    repeaters && repeaters.map((e, index) => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <RepeaterScreen {...e} key={index} />
                                </div>
                            </div>
                        )
                    })
                }
                {
                    documents &&
                    (
                        <div className="card">
                            <div className="card-body">
                                <FileContext.Provider value={{ file, setFile }}>
                                    <DocScreen endPoint={endPoint} columns={docColumns} />
                                </FileContext.Provider>
                            </div>
                        </div>
                    )
                }
                <ActionButtons />
            </Form>
        </>
    )
}
