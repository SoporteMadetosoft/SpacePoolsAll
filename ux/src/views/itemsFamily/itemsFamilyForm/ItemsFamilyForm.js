import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { Input } from '../../../components/form/inputs/Input'
import { SelectArbol } from '../../../components/form/inputs/SelectArbol'
import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { save } from '../../../utility/helpers/Axios/save'
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { handleChangeController } from '../../../redux/actions/normalForm'

const ValidationSchema = yup.object().shape({
    familyCode: yup.string().required(),
    name: yup.string().required()
})

export const ItemsFamilyForm = () => {

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.normalForm)
    const { normalForm } = useSelector(state => state)

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const submit = async () => {
        const prettyForm = {
            ...form,
            parent: form.parent
        }

        save('Family', id, prettyForm)
        dispatch(handleCleanUp())
        history.push('/items/family')
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Familia</label>
                        <InputValid
                            id="familyCode"
                            name="familyCode"
                            type="text"
                            value={normalForm['familyCode']}
                            placeholder="Nº Familia"
                            innerRef={register({ required: true })}
                            invalid={errors.familyCode && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.familyCode && <FormFeedback>Nº Familia requerido</FormFeedback>}
                    </div>
                    <div className="col-md-5">
                        <label className="control-label">Nombre</label>
                        <InputValid
                            id="name"
                            name="name"
                            type="text"
                            value={normalForm['name']}
                            placeholder="Nombre"
                            innerRef={register({ required: true })}
                            invalid={errors.name && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.name && <FormFeedback>Nombre requerido</FormFeedback>}
                    </div>
                    <div className="col-md-5">
                        <SelectArbol name="parent" label="Padre" endpoint="Family" />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
