import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Form } from 'reactstrap'
import { GetSetNextId, handleGetForm } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { setErrors, setSchema } from '../../../../../redux/actions/formValidator'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'
import { handleCleanUp } from '../../../../../redux/actions/fileUpload'
import { validate, validator } from '../../../../../utility/formValidator/ValidationTypes'
import { Input } from '../../../../../components/form/inputs/Input'


const formSchema = {
    name: { validations: [validator.isRequired] },
    value: { validations: [validator.isRequired] }
}



export const PaymentMethodsForm = () => {

    const { id } = useParams()
    //const form = useSelector(state => state.normalForm)
    const history = useHistory()
    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)


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
            form2.then( async (value) => {
                const prettyForm = {
                    ...value

                }


                save('PaymentMethods', id, prettyForm)
                dispatch(handleCleanUp)
                history.push('/setup/general/paymentMethods')

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
                            label="Métodos de pago"
                            name="name"
                            type="text"
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            label="Valor"
                            name="value"
                            type="number"
                        />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>

    )
}
