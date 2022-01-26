import React, { useEffect } from 'react'
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
import { AddressesRepeater } from './customers/customerForm/AddressesRepeater'
import { RepeaterScreen } from './RepeaterScreen'

export const FormScreen = ({ titulo, endPoint, form }) => {

    const { base, structure, errors, repeaters } = form
    const { id } = useParams()
    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)

    const breadCrumTitle = (id) ? `Editar ${titulo}` : `Añadir ${titulo}`

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing(endPoint, id))
        } else {
            dispatch(GetSetNextId(endPoint, 'customerCode')) //TODO: Se tiene que refactorizar este metodo para que no se le tenga que pasar el campo
        }
        dispatch(initNormalForm(structure[0]))
        dispatch(setSchema(errors[0]))
    }, [initNormalForm])

    const submit = async (e) => {
        e.preventDefault()
        const errors = validate(formValidator.schema, normalForm)
        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))
        } else {
            console.log(PrettyForm(normalForm, structure[0]))
            //save(endPoint, id, PrettyForm(normalForm, structure[0]))
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
                                const Component = e.endPoint ? Select : Input
                                return (
                                    <div className={clase}>
                                        <Component props={e} />
                                    </div>
                                )
                            })
                        }
                        <div className="col-md-12">
                            <label className="control-label">Observaciones</label>
                            <textarea
                                className="form-control"
                                name="observations"
                                value=""
                            />
                        </div>
                    </div>
                </div>
                {
                    repeaters.map((e) => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <RepeaterScreen props={e} />
                                </div>
                            </div>
                        )
                    })
                }
                <ActionButtons />
            </Form>
        </>
    )
}
