import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { AddressesRepeater } from './AddressesRepeater'
import { ContactsRepeater } from './ContactsRepeater'


export const VendorsForm = (id) => {

    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)

    const {
        comercialName,
        cif,
        socialReason,
        phone,
        email,
        idVendorType,
        idPaymentMethod,
        idStatus,
        observations } = normalForm

    const { 
        paymentMethodOpt,
        vendorTypesOpt,
        statusOpt } = selectReducer

    useEffect( () => {
        // if (id) {
        //     dispatch(handleStartEditing('Vehicles', id))
        // }
    }, [])


    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = (key, value) => {
        dispatch(handleChangeController(key, value))
    }

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-3">
                        <label className="control-label">Nombre Comercial</label>
                        <input
                            className="form-control"
                            name="comercialName"
                            placeholder="Nombre Comercial"
                            value={comercialName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">C.I.F.</label>
                        <input
                            className="form-control"
                            name="CIF"
                            placeholder="C.I.F."
                            value={cif}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Razon social</label>
                        <input
                            className="form-control"
                            name="socialReason"
                            placeholder="Razon social"
                            value={socialReason}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Teléfono</label>
                        <input
                            className="form-control"
                            name="phone"
                            placeholder="Teléfono"
                            value={phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Correo electrónico</label>
                        <input
                            className="form-control"
                            name="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Forma de pago</label>
                        <Select
                            name="idPaymentMethod"
                            placeholder="Forma de pago"
                            options={ paymentMethodOpt }
                            defaultValue={idPaymentMethod}
                            onChange={ (value) => { handleSelectChange('idPaymentMethod', value) }}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Tipo de proveedor</label>
                        <Select
                            name="idVendorType"
                            placeholder="Tipo de proveedor"
                            options={ vendorTypesOpt }
                            defaultValue={idVendorType}
                            onChange={ (value) => { handleSelectChange('idVendorType', value) }}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Estado</label>
                        <Select
                            name="idStatus"
                            placeholder="Estado"
                            options={ statusOpt }
                            defaultValue={idStatus}
                            onChange={ (value) => { handleSelectChange('idStatus', value) }}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="control-label">Observaciones</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="observations"
                            placeholder="Observaciones"
                            defaultValue={observations}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <AddressesRepeater />
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <ContactsRepeater />
                </div>
            </div>
        </>
    )
}
