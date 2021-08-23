import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Select from 'react-select'
import BreadCrumbs from '@components/breadcrumbs'

import { handleStartEditing } from '../../redux/actions/normalForm'
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
    const form = useSelector(state => state.normalForm)

    
    const {
        customerCode,
        comercialName,
        comercialNum,
        CIF,
        socialReason,
        phone,
        email,
        accountNumber,
        observations,
        payDay,
        mode,
        status,
        idLanguage,
        idPaymentMethod,
        idCustomerOrigin,
        idCustomerType,
        idCustomerActivity,
        idCustomerCategory } = normalForm


        const { 
            paymentMethodOpt,
            paymentDayOpt,
            customerOriginOpt,
            customerTypeOpt,
            customerActivityOpt,
            customerCategoryOpt,
            modeOpt,
            statusOpt,
            languageOpt } = selectReducer



    const customerName = normalForm.comercialName ? normalForm.comercialName : title
    
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

        let addressesPretty = ''

        form.addresses.forEach(e => {
            addressesPretty = [
                {
                    ...e,
                    addressType: e.addressType.value
                }
            ]
        })

        let contactPretty = ''

        form.contacts.forEach(e => {
            contactPretty = [
                {
                    ...e,
                    department: e.department.value
                }
            ]
        })

        const prettyForm = {
            ...form,
            idPaymentMethod: form.idPaymentMethod.value,
            payDay: form.payDay.value,
            idCustomerOrigin: form.idCustomerOrigin.value,
            idCustomerType: form.idCustomerType.value,
            idCustomerActivity: form.idCustomerActivity.value,
            idCustomerCategory: form.idCustomerCategory.value,
            mode: form.mode.value,
            status: form.status.value,
            idLanguage: form.idLanguage.value,
            addresses: [...addressesPretty],
            contacts: [...contactPretty]

        }
        save('Customers', id, prettyForm)
        history.push('/customers')
    }

    return (
        <form onSubmit={handleSubmit}>
            <BreadCrumbs breadCrumbTitle={ customerName } breadCrumbParent='Clientes' breadCrumbActive={title} />
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Cliente</label>
                        <input
                            className="form-control"
                            name="customerCode"
                            placeholder="Nº Cliente"
                            value={customerCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="control-label">Nombre</label>
                        <input
                            className="form-control"
                            name="comercialName"
                            placeholder="Nombre"
                            value={comercialName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">C.I.F.</label>
                        <input
                            className="form-control"
                            name="CIF"
                            placeholder="C.I.F."
                            value={CIF}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Razon social</label>
                        <input
                            className="form-control"
                            name="socialReason"
                            placeholder="Razon social"
                            value={socialReason}
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
                            value={idPaymentMethod}
                            onChange={ (value) => { handleSelectChange('idPaymentMethod', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Día de pago</label>
                        <Select
                            name="payDay"
                            options={ paymentDayOpt }
                            value={payDay}
                            onChange={ (value) => { handleSelectChange('payDay', value) }}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="control-label">Origen</label>
                        <Select
                            name="idCustomerOrigin"
                            options={ customerOriginOpt }
                            value={idCustomerOrigin}
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
                            value={idCustomerType}
                            onChange={ (value) => { handleSelectChange('idCustomerType', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Actividad</label>
                        <Select
                            name="idCustomerActivity"
                            options={ customerActivityOpt }
                            value={idCustomerActivity}
                            onChange={ (value) => { handleSelectChange('idCustomerActivity', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Categoría de cliente</label>
                        <Select
                            name="idCustomerCategory"
                            options={ customerCategoryOpt }
                            value={idCustomerCategory}
                            onChange={ (value) => { handleSelectChange('idCustomerCategory', value) }}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="control-label">Modo</label>
                        <Select
                            name="mode"
                            placeholder="Modo"
                            options={ modeOpt }
                            value={mode}
                            onChange={ (value) => { handleSelectChange('mode', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Estado</label>
                        <Select
                            name="status"
                            placeholder="Estado"
                            options={ statusOpt }
                            value={status}
                            onChange={ (value) => { handleSelectChange('status', value) }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Idioma</label>
                        <Select
                            name="idLanguage"
                            placeholder="Idioma"
                            options={ languageOpt }
                            value={idLanguage}
                            onChange={ (value) => { handleSelectChange('idLanguage', value) }}

                        />
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
