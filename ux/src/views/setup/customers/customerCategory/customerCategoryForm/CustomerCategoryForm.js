import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { handleChangeController } from '../../../../../redux/actions/normalForm'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { save } from '../../../../../utility/helpers/Axios/save'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { useForm } from 'react-hook-form'

const ValidationSchema = yup.object().shape({
    name: yup.string().required()
})

export const CustomerCategoryForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams()

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { normalForm } = useSelector(state => state)
    const { name } = normalForm

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const submit = async () => {
        save('CustomerCategory', id, normalForm)
        history.push('/setup/customer/category')
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <label className="control-label">Categoria de cliente</label>
                        <InputValid
                            id="name"
                            name="name"
                            type="text"
                            value={normalForm['name']}
                            placeholder="Categoria de cliente"
                            innerRef={register({ required: true })}
                            invalid={errors.name && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.name && <FormFeedback>Categoria de cliente requerida</FormFeedback>}

                    </div>
                </div>
            </div>
            <ActionButtons />

        </Form>
    )
}
