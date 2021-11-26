import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useForm } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Form, Input as InputValid, FormFeedback } from 'reactstrap'

import { GetSetNextId, handleChangeController } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'

import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { validate, validator } from '../../../../../utility/formValidator/ValidationTypes'
import { Input } from '../../../../../components/form/inputs/Input'
import { setErrors, setSchema } from '../../../../../redux/actions/formValidator'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'

const formSchema = {
    name: { validations: [validator.isRequired] }
}

export const VendorTypeForm = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const form = useSelector(state => state.normalForm)

    const { normalForm, formValidator } = useSelector(state => state)

    useEffect(() => {
        //dispatch(startAddSelectOptionsons('Activity', 'Activity'))

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("VendorType", 'id'))
        } else id = normalForm.id
        dispatch(setSchema(formSchema))
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, form)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const prettyForm = {
                ...form,
                name : exceptionController(form.name)
            }
        save('VendorType', id, prettyForm)
        history.push('/setup/vendors/vendorType')
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <Input  required="true" name="name" type="text" label="Tipo de vendedor" onChange={handleInputChange}/>
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
