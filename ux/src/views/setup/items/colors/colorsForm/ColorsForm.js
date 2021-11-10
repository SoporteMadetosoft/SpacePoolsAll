import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Form } from 'reactstrap'

import { GetSetNextId, handleChangeController, handleGetForm } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'

import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { setErrors, setSchema } from '../../../../../redux/actions/formValidator'
import { validate, validator } from '../../../../../utility/formValidator/ValidationTypes'
import { Input } from '../../../../../components/form/inputs/Input'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'

const formSchema = {
    name: { validations: [validator.isRequired] }
}

export const ColorsForm = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()


    const { normalForm, formValidator } = useSelector(state => state)

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }
    useEffect(() => {
       
        dispatch(setSchema(formSchema))
    }, [])

    const submit = async (e) => {
        e.preventDefault()
        const errors = validate(formValidator.schema, normalForm)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))
        } else {

            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    name: exceptionController(value.name)
                }
                save('Colors', id, prettyForm)
                history.push('/setup/items/colors')
            })
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <Input
                            id="name"
                            label="Color"
                            name="name"
                            type="text"
                        />
                    </div>

                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
