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
import { startAddSelectOptions, startAddSelectStatus } from '../../../redux/actions/selects'
import ReactSelect from 'react-select'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { undoMultiSelect } from '../../../utility/helpers/undoMultiSelect'
import { validator } from '../../../utility/formValidator/ValidationTypes'
import { setSchema } from '../../../redux/actions/formValidator'

// const ValidationSchema = yup.object().shape({
//     valueType: yup.string().required()
// })

const formSchema = {
    familia: { validations: [validator.isRequired] },
    subfamilia: { validations: [validator.isRequired] }
}

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

    // const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { description } = normalForm
    const { ItemType } = selectReducer

    const valueType = normalForm['itemType'] ? deconstructSelect(normalForm['itemType']) : ''

    useEffect(() => {
        dispatch(startAddSelectOptions('ItemType', 'ItemType'))
        dispatch(startAddSelectStatus('Vendors', 'Vendors', 'comercialName'))

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Items", 'itemCode'))
        } else itemCode = normalForm.id
        dispatch(setSchema(formSchema))
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))

    }

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleChangeController('itemType', { id: value, name: label }))
        //  dispatch(handleChangeController('valueType', value))

    }

    const submit = async () => {

        const errors = validate(formValidator.schema, form)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const prettyForm = {
                ...form,
                idVendor: exceptionController(form.idVendor),
                itemType: exceptionController(form.itemType),
                idFamily: exceptionController(form.idFamily),
                idPlace: exceptionController(form.idPlace),
                idColor: undoMultiSelect(form.idColor, 'idColor')
            }
            save('Items', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/items')
        }

    }

    return (
        <Form onSubmit={submit}>
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
                            style={{ opacity: 0, height: 0, position: 'absolute' }}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="col-md-3">
                        <Select required="true" name="idVendor" label="Proveedor" endpoint="Vendors" labelName="comercialName" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idPlace" label="Ubicación" endpoint="Place" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idColor" label="Colores" endpoint="Colors" isMulti={true} />
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
