import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useParams } from 'react-router-dom'
import { Form } from 'reactstrap'
import { GetSetNextId, handleChangeController } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { validate, validator } from '../../../../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../../../../redux/actions/formValidator'
import { startAddSelectOptions } from '../../../../../redux/actions/selects'
import { Input } from '../../../../../components/form/inputs/Input'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'

//const ValidationSchema = yup.object().shape({
  //  name: yup.string().required()
//})

const formSchema = {
    name: { validations: [validator.isRequired] }

}

export const CustomerTypeForm = () => {

    //let { costumerCode } = useSelector(state => state.normalForm)

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const form = useSelector(state => state.normalForm)

    const { normalForm, formValidator} = useSelector(state => state)


    const valueType = normalForm['customerType'] ? deconstructSelect(normalForm['customerType']) : ''
    
    useEffect(() => {
        dispatch(startAddSelectOptions('CustomerType', 'CustomerType'))

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("CustomerType", 'customerType'))
        } else costumerCode = normalForm.id
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
        
        e.preventDefault()
        save('CustomerType', id, prettyForm)
        history.push('/setup/customer/customerType')
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">

                        <Input required="true" name="name" type="text" label="Tipo de Cliente" />

                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
