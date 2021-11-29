import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetSetNextId, handleChangeController } from '../../../../../redux/actions/normalForm'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { save } from '../../../../../utility/helpers/Axios/save'
import { Form } from 'reactstrap'
import { Input } from '../../../../../components/form/inputs/Input'
import { Textarea } from '../../../../../components/form/inputs/Textarea'
import { setErrors, setSchema } from '../../../../../redux/actions/formValidator'
import { validate, validator } from '../../../../../utility/formValidator/ValidationTypes'
import { Select } from '../../../../../components/form/inputs/Select'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'

const formSchema = {
    name: { validations: [validator.isRequired] },
    logo: { validations: [validator.isRequired] }
}


export const OriginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams()

    const form = useSelector(state => state.normalForm)

    const { normalForm, formValidator } = useSelector(state => state)

    useEffect(() => {
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Origin", 'id'))
        }
        dispatch(setSchema(formSchema))
    }, [])

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, form)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const prettyForm = {
                ...form,
                logo: exceptionController(form.logo)
            }
            save('Origin', id, prettyForm)
            history.push('/setup/customer/origin')
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <Input required="true" name="name" type="text" label="Origen" />
                    </div>
                    <div className="col-md-4">
                        <Select required="true" name="logo" label="Logo" endpoint="Logos" />
                    </div>
                    <div className="col-md-12">
                        <Textarea name="info" type="text" label="Información" />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
