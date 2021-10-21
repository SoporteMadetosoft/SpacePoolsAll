import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetSetNextId, handleChangeController, handleCleanSection } from '../../../redux/actions/normalForm'
import ReactSelect from 'react-select'


import { ItemsRepeater } from './ItemsRepeater'

import { Input } from '../../../components/form/inputs/Input'
import { startAddSelectOptions, startAddSelectStatus } from '../../../redux/actions/selects'
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
    let { purchaseCode } = useSelector(state => state.normalForm)



    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)
    useEffect(() => {
        
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Purchases", 'purchaseCode'))
        } else purchaseCode = normalForm.id
    }, [])

    const { observations } = normalForm

    const { Vendors } = selectReducer

    useEffect(() => {
        // dispatch(startAddSelectOptions('Vendors', 'Vendors', 'comercialName'))
        dispatch(startAddSelectStatus('Vendors','Vendors','comercialName'))
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleCleanSection('items'))
        dispatch(handleChangeController('idVendor', { id: value, comercialName: label }))
    }

    const valueVendor = normalForm['idVendor'] ? deconstructSelect(normalForm['idVendor'], 'comercialName') : ''

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Pedido</label>
                        <input
                            className={`form-control`}
                            name="purchaseCode"
                            value={purchaseCode}
                            readOnly
                        />
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
                    <div className="col-md-3">
                        <Input name="purchaseDate" type="date" placeholder="Fecha de compra" label="Fecha de compra" />
                    </div>
                    <div className="col-md-3">
                        <Input name="deliveryDate" type="date" placeholder="Fecha de entrega" label="Fecha de entrega" />
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
