import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useParams } from 'react-router-dom'
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { handleChangeController } from '../../../../../redux/actions/normalForm'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { save } from '../../../../../utility/helpers/Axios/save'
import { useHistory, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'

const ValidationSchema = yup.object().shape({
    name: yup.string().required()
})

export const CustomerTypeForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const { normalForm } = useSelector(state => state)
    const { name } = normalForm

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })


    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const submit = async () => {
        save('CustomerType', id, normalForm)
        history.push('/setup/customer/customerType')
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <label className="control-label">Tipo de cliente</label>
                        <InputValid
                            id="name"
                            name="name"
                            type="text"
                            value={normalForm['name']}
                            placeholder="Tipo de cliente"
                            innerRef={register({ required: true })}
                            invalid={errors.name && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.name && <FormFeedback>Tipo de cliente requerido</FormFeedback>}
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
