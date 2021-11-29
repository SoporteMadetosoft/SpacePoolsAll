import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { GetSetNextId, handleChangeController, handleStartEditing } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { validate, validator } from '../../../../../utility/formValidator/ValidationTypes'
import { Input } from '../../../../../components/form/inputs/Input'
import { setErrors, setSchema } from '../../../../../redux/actions/formValidator'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'


const formSchema = {
    name: { validations: [validator.isRequired] }
}

export const ActivityForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams()

    const form = useSelector(state => state.normalForm)

    const { normalForm, formValidator } = useSelector(state => state)
    
    useEffect(() => {
        //dispatch(startAddSelectOptionsons('Activity', 'Activity'))

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Activity", 'id'))
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
                ...form
                //name : exceptionController(form.name)
            }
        
        save('Activity', id, prettyForm)
        history.push('/setup/customer/activity')
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <Input required="true" name="name" type="text" label="Actividad"  onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
