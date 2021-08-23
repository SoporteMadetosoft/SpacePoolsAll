import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Select from 'react-select'
import BreadCrumbs from '@components/breadcrumbs'

import { handleStartEditing } from '../../redux/actions/form'
import { ActionButtons } from '../../components/actionButtons/ActionButtons'
import { save } from '../../utility/helpers/Axios/save'

import { handleChangeController, initNormalForm } from '../../redux/actions/normalForm/index.js'
import { cleanSelectOptions } from '../../redux/actions/selects/index.js'
import { AddressesRepeater } from './customerForm/AddressesRepeater'
import { ContactsRepeater } from './customerForm/ContactsRepeater'


const structureForm = {
    addresses: [],
    contacts: []
}

export const CustomerFormScreen = () => {

    const { id } = useParams()
    
    const title = (id) ? 'Editar Cliente' : 'Añadir Cliente'
    
    const dispatch = useDispatch()
    const history = useHistory()
    
    const { normalForm, selectReducer } = useSelector(state => state)
    
    const {
        name,
        cif,
        businessName,
        phone,
        comercialNum,
        email,
        idPaymentMethod,
        idPaymentDay,
        pickupTime,
        idCustomerOrigin,
        accountNumber,
        idCustomerType,
        idCustomerActivity,
        idCustomerCategory,
        idLogisticZone,
        idMode,
        idStatus,
        idLanguage } = normalForm

    const { 
        paymentMethodOpt,
        paymentDayOpt,
        customerOriginOpt,
        customerTypeOpt,
        customerActivityOpt,
        customerCategoryOpt,
        logisticZoneOpt,
        modeOpt,
        statusOpt,
        languageOpt } = selectReducer


    const customerName = normalForm.name ? normalForm.name : title
    
    useEffect(() => {
        dispatch( initNormalForm(structureForm) )
    }, [cleanSelectOptions, initNormalForm])

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Customers', id))
        }
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = (key, value) => {
        dispatch(handleChangeController(key, value))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        save('Customers', id, form)
        history.push('/customers')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={ customerName } breadCrumbParent='Clientes' breadCrumbActive={title} />
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <label className="control-label">Nombre</label>
                        <input
                            className="form-control"
                            name="name"
                            placeholder="Nombre"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">C.I.F.</label>
                        <input
                            className="form-control"
                            name="cif"
                            placeholder="C.I.F."
                            value={cif}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Razon social</label>
                        <input
                            className="form-control"
                            name="businessName"
                            placeholder="Razon social"
                            value={businessName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Teléfono</label>
                        <input
                            className="form-control"
                            name="phone"
                            placeholder="Teléfono"
                            value={phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Número Comercial</label>
                        <input
                            className="form-control"
                            name="comercialNum"
                            placeholder="Número Comercial"
                            value={comercialNum}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="col-md-4">
                        <label className="control-label">E-mail</label>
                        <input
                            className="form-control"
                            name="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Forma de pago</label>
                        <Select
                            name="idPaymentMethod"
                            options={ paymentMethodOpt }
                            defaultValue={idPaymentMethod}
                            onChange={ (value) => { handleSelectChange('idPaymentMethod', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Día de pago</label>
                        <Select
                            name="idPaymentDay"
                            options={ paymentDayOpt }
                            defaultValue={idPaymentDay}
                            onChange={ (value) => { handleSelectChange('idPaymentDay', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Hora de recogida</label>
                        <input
                            className="form-control"
                            type="time"
                            name="pickupTime"
                            value={pickupTime}

                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Origen</label>
                        <Select
                            name="idCustomerOrigin"
                            options={ customerOriginOpt }
                            defaultValue={idCustomerOrigin}
                            onChange={ (value) => { handleSelectChange('idCustomerOrigin', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Número de cuenta</label>
                        <input
                            className="form-control"
                            name="accountNumber"
                            placeholder="Número de cuenta"
                            value={accountNumber}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Tipo de cliente</label>
                        <Select
                            name="idCustomerType"
                            options={ customerTypeOpt }
                            defaultValue={idCustomerType}
                            onChange={ (value) => { handleSelectChange('idCustomerType', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Actividad</label>
                        <Select
                            name="idCustomerActivity"
                            options={ customerActivityOpt }
                            defaultValue={idCustomerActivity}
                            onChange={ (value) => { handleSelectChange('idCustomerActivity', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Categoría de cliente</label>
                        <Select
                            name="idCustomerCategory"
                            options={ customerCategoryOpt }
                            defaultValue={idCustomerCategory}
                            onChange={ (value) => { handleSelectChange('idCustomerCategory', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Zona logística</label>
                        <Select
                            name="idLogisticZone"
                            placeholder="Zona logística"
                            options={ logisticZoneOpt }
                            defaultValue={idLogisticZone}
                            onChange={ (value) => { handleSelectChange('idLogisticZone', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Modo</label>
                        <Select
                            name="idMode"
                            placeholder="Modo"
                            options={ modeOpt }
                            defaultValue={idMode}
                            onChange={ (value) => { handleSelectChange('idMode', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Estado</label>
                        <Select
                            name="idStatus"
                            placeholder="Estado"
                            options={ statusOpt }
                            defaultValue={idStatus}
                            onChange={ (value) => { handleSelectChange('idStatus', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Idioma</label>
                        <Select
                            name="idLanguage"
                            placeholder="Idioma"
                            options={ languageOpt }
                            defaultValue={idLanguage}
                            onChange={ (value) => { handleSelectChange('idLanguage', value) }}

                        />
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
            <ActionButtons />
        </form>
    )
}
