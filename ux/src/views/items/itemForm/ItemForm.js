import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { GetSetNextId, handleChangeController } from '../../../redux/actions/normalForm'
import { save } from '../../../utility/helpers/Axios/save'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { startAddSelectOptions } from '../../../redux/actions/selects'
import ReactSelect from 'react-select'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'

const ValidationSchema = yup.object().shape({
    valueType: yup.string().required()
})

const placeholderStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            FontSize: '5px'
        }
    }
}

export const ItemForm = () => {

    let { itemCode } = useSelector(state => state.normalForm)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const form = useSelector(state => state.normalForm)

    const { normalForm, selectReducer } = useSelector(state => state)

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })
    console.log(errors)
    const { description } = normalForm
    const { ItemType } = selectReducer

    const valueType = normalForm['itemType'] ? deconstructSelect(normalForm['itemType']) : ''

    useEffect(() => {
        dispatch(startAddSelectOptions('ItemType', 'ItemType'))
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Items", 'itemCode'))
        } else itemCode = normalForm.id
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))

    }

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleChangeController('itemType', { id: value, name: label }))
        //  dispatch(handleChangeController('valueType', value))

    }

    const submit = async () => {
        console.log('--------------------------________________________')
        const prettyForm = {
            ...form,
            idVendor: exceptionController(form.idVendor),
            itemType: exceptionController(form.itemType),
            idFamily: exceptionController(form.idFamily),
            idPlace: exceptionController(form.idPlace)

        }

        save('Items', id, prettyForm)
        dispatch(handleCleanUp())
        history.push('/items')
    }

    console.log(valueType)

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Artículo</label>
                        <input
                            className={`form-control`}
                            name="itemCode"
                            value={itemCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        <Input name="name" label="Nombre" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idFamily" label="Familia" endpoint="Family" />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Tipo de artículo</label>
                        <ReactSelect
                            id="itemType"
                            name="itemType"
                            options={ItemType}
                            value={valueType}
                            styles={placeholderStyles}
                            placeholder="Tipo de artículo"
                            onChange={handleSelectChange}
                        />
                        <InputValid
                            id="valueType"
                            name="valueType"
                            tabIndex={-1}
                            autoComplete="off"
                            value={valueType}
                            innerRef={register({ required: true })}
                            invalid={errors.valueType && true}
                            style={{ opacity: 0, height: 0, position: 'absolute' }}
                            onChange={handleInputChange}
                        />
                        {errors && errors.valueType && (
                            <>
                                <FormFeedback>Tipo de artículo requerido</FormFeedback>
                            </>
                        )}
                    </div>
                    <div className="col-md-3">
                        <Select required="true" name="idVendor" label="Proveedor" endpoint="Vendors" labelName="comercialName" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idPlace" label="Ubicación" endpoint="Place" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="minimumStock" label="Stock mínimo" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="stock" label="Stock" />
                    </div>


                    <div className="col-md-3">
                        <Input type="number" name="priceVATout" label="Precio sin IVA" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="priceVATin" label="Precio con IVA" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="cost" label="Coste" />
                    </div>
                    <div className="col-md-3">
                        <Input type="number" name="maximumCost" label="Coste máximo" />
                    </div>


                    <div className="col-md-12">
                        <label className="control-label">Descripción</label>
                        <textarea
                            className="form-control"
                            name="description"
                            placeholder="Descripción"
                            value={description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
