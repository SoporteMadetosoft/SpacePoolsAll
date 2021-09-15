import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController, handleCleanSection } from '../../../redux/actions/normalForm'
import ReactSelect from 'react-select'

import { ItemsRepeater } from './ItemsRepeater'

import { Input } from '../../../components/form/inputs/Input'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'

const placeholderStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            FontSize: '5px'
        }
    }
}

export const PurchaseForm = () => {

    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)

    const { observations } = normalForm

    const { Vendors } = selectReducer

    useEffect(() => {
        dispatch(startAddSelectOptions('Vendors', 'Vendors', 'comercialName'))
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleCleanSection('items'))
        dispatch(handleChangeController('idVendor', { id: value, name: label }))
    }

    const valueVendor = normalForm['idVendor'] ? deconstructSelect(normalForm['idVendor']) : ''

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="purchaseCode" placeholder="Nº venta" label="Nº venta" />
                    </div>
                    <div className="col-md-4">
                        <label className="control-label">Proveedor</label>
                        <ReactSelect
                            id="idVendor"
                            name="idVendor"
                            options={Vendors}
                            value={valueVendor}
                            styles={placeholderStyles}
                            placeholder="Proveedor"
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <Input name="purchaseDate" type="date" placeholder="Fecha de compra" label="Fecha de compra" />
                    </div>
                    <div className="col-md-2">
                        <Input name="deliveryDate" type="date" placeholder="Fecha de entrega" label="Fecha de entrega" />
                    </div>
                    <div className="col-md-2">
                        <Input name="phone" placeholder="Teléfono" label="Teléfono" />
                    </div>

                    <div className="col-md-12">
                        <label className="control-label">Observaciones</label>
                        <textarea
                            className="form-control"
                            name="observations"
                            value={observations}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <ItemsRepeater />
                </div>
            </div>
        </>
    )
}
