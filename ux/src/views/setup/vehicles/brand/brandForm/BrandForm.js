import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { handleChangeController } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'
import { Form } from 'reactstrap'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { Input } from '../../../../../components/form/inputs/Input'
import { setErrors, setSchema } from '../../../../../redux/actions/formValidator'
import { validate, validator } from '../../../../../utility/formValidator/ValidationTypes'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'

const formSchema = {
    name: { validations: [validator.isRequired] }
}

export const BrandForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams()

    const form = useSelector(state => state.normalForm)

    const { formValidator } = useSelector(state => state)

    useEffect(() => {
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
                ...form
               // name: exceptionController(form.name)
            }
            save('Brand', id, prettyForm)
            history.push('/setup/vehicles/brand')
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <Input required="true" name="name" type="text" label="Marca" onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
