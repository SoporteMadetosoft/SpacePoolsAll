import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useForm } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Form, Input as InputValid, FormFeedback } from 'reactstrap'

import { handleChangeController } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'

import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'

const ValidationSchema = yup.object().shape({
    name: yup.string().required()
})

export const AddressesTypesForm = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { normalForm } = useSelector(state => state)

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const submit = async () => {
        save('AddressesTypes', id, normalForm)
        history.push('/setup/general/addressesTypes')
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <label className="control-label">Tipo de dirección</label>
                        <InputValid
                            id="name"
                            name="name"
                            type="text"
                            value={normalForm['name']}
                            placeholder="Tipo de dirección"
                            innerRef={register({ required: true })}
                            invalid={errors.name && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.name && <FormFeedback>Tipo de dirección requerida</FormFeedback>}
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
