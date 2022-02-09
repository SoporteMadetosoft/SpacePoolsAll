import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Form } from 'reactstrap'

import { GetSetNextId, handleStartEditing, initNormalForm } from '../redux/actions/normalForm'
import BreadCrumbs from '@components/breadcrumbs'

import { Input } from '../components/form/inputs/Input'
import { Select } from '../components/form/inputs/Select'
import { ActionButtons } from '../components/actionButtons/ActionButtons'
import { setErrors, setSchema } from '../redux/actions/formValidator'
import { validate } from '../utility/formValidator/ValidationTypes'
import { PrettyForm } from '../utility/formFormats/prettyForm'
import { RepeaterScreen } from './RepeaterScreen'
import { Textarea } from '../components/form/inputs/Textarea'
import { DocScreen } from './DocScreen'
import { FileContext } from '../utility/context/FileContext'
import { save } from '../utility/helpers/Axios/save'

export const FormScreen = ({ titulo, endPoint, form, docColumns }) => {

    const { base, structure, errors, repeaters, autoincrement, documents } = form
    const { id } = useParams()
    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)
    const [file, setFile] = useState([])

    const breadCrumTitle = (id) ? `Editar ${titulo}` : `Añadir ${titulo}`

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing(endPoint, id))
        } else {
            dispatch(GetSetNextId(endPoint, autoincrement))
        }
        dispatch(initNormalForm(structure))
        dispatch(setSchema(errors))
    }, [initNormalForm])

    const submit = async (e) => {
        e.preventDefault()
        const errors = validate(formValidator.schema, normalForm)
        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))
        } else {
            console.log(PrettyForm(normalForm, structure))
            // save(endPoint, id, PrettyForm(normalForm, structure[0]))
        }
    }

    return (
        <>
            <BreadCrumbs breadCrumbTitle={breadCrumTitle} breadCrumbParent={titulo} />
            <Form onSubmit={submit}>
                <div className="card">
                    <div className=" card-body row pb-3 px-3">
                        {
                            base.map((e) => {
                                const clase = `col-${e.col[1]} col-xs-${e.col[0]} col-md-${e.col[1]} col-lg-${e.col[2]}`
                                const Component = e.endPoint ? Select : e.area ? Textarea : Input
                                return (
                                    <div className={clase}>
                                        <Component {...e} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    repeaters.map((e) => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <RepeaterScreen {...e} />
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
