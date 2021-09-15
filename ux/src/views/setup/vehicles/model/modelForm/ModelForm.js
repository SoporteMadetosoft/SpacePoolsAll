import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController, handleStartEditing } from '../../../../../redux/actions/normalForm'
import { save } from '../../../../../utility/helpers/Axios/save'
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { ActionButtons } from '../../../../../components/actionButtons/ActionButtons'
import { useHistory, useParams } from 'react-router'
import ReactSelect from 'react-select'
import { startAddSelectOptions } from '../../../../../redux/actions/selects'
import { deconstructSelect } from '../../../../../utility/helpers/deconstructSelect'
import { exceptionController } from '../../../../../utility/helpers/undefinedExceptionController'


const ValidationSchema = yup.object().shape({
    name: yup.string().required(),
    valueBrand: yup.string().required()
})

const placeholderStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            FontSize: '5px'
        }
    }
}

export const ModelForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(startAddSelectOptions('Brand', 'Brand'))
    }, [])

    const { id } = useParams()

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { normalForm, selectReducer } = useSelector(state => state)
    const { name, idBrand } = normalForm
    const { Brand } = selectReducer

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleChangeController('idBrand', { id: value, name: label }))
    }


    const submit = async () => {

        console.log("pasando")
       const prettyForm = {
           ...normalForm,
           idBrand: exceptionController(normalForm.idBrand)
       }
       save('Model', id, prettyForm)
       history.push('/setup/vehicles/model')
    }


    const valueBrand = normalForm['idBrand'] ? deconstructSelect(normalForm['idBrand']) : ''

    console.log(errors)
    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                
                        <label className="control-label">Marca</label>
                        <ReactSelect
                            id="idBrand"
                            name="idBrand"
                            options={Brand}
                            value={valueBrand}
                            styles={placeholderStyles}
                            placeholder="Marca"
                            onChange={handleSelectChange}
                        />
                        {errors && errors.valueBrand && (
                            <>
                                <InputValid
                                    id="valueBrand"
                                    name="valueBrand"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={valueBrand}
                                    innerRef={register({ required: true })}
                                    invalid={errors.valueBrand && true}
                                    style={{ opacity: 0, height: 0, position: 'absolute' }}
                                    onChange={handleInputChange}
                                />
                                <FormFeedback>Marca requerida</FormFeedback>
                            </>
                        )}
                    
                    
                    
                    </div>
                    <div className="col-md-4">
                        <label className="control-label">Modelo</label>
                            <InputValid
                            id="name"
                            name="name"
                            type="text"
                            value={normalForm['name']}
                            placeholder="Modelo"
                            innerRef={register({ required: true })}
                            invalid={errors.name && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.name && <FormFeedback>Modelo requerido</FormFeedback>}

                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}