import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController, handleStartEditing } from '../../../../../redux/actions/normalForm'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { save } from '../../../../../utility/helpers/Axios/save'
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'


const ValidationSchema = yup.object().shape({
    name: yup.string().required()
})

export const OriginForm = () => {
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
        save('Origin', id, normalForm)
        history.push('/setup/customer/origin')
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <label className="control-label">Origen</label>
                            <InputValid
                            id="name"
                            name="name"
                            type="text"
                            value={normalForm['name']}
                            placeholder="Origen"
                            innerRef={register({ required: true })}
                            invalid={errors.name && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.name && <FormFeedback>Origen requerido</FormFeedback>}
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
