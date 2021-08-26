import Select from 'react-select'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController, handleStartEditing } from '../../../redux/actions/normalForm'
import { save } from '../../../utility/helpers/Axios/save'

import { AddressesRepeater } from './AddressesRepeater'
import { ContactsRepeater } from './ContactsRepeater'
import { useParams } from 'react-router-dom'

export const CustomersForm = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

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
        idPayDay,
        idMode,
        idStatus,
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
            idPayDay: form.idPayDay.value,
            idCustomerOrigin: form.idCustomerOrigin.value,
            idCustomerType: form.idCustomerType.value,
            idCustomerActivity: form.idCustomerActivity.value,
            idCustomerCategory: form.idCustomerCategory.value,
            idMode: form.idMode.value,
            idStatus: form.idStatus.value,
            idLanguage: form.idLanguage.value,
            addresses: [...addressesPretty],
            contacts: [...contactPretty]

        }
        save('Customers', id, prettyForm)
        history.push('/customers')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                                required
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
                                required
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
                                name="idPayDay"
                                options={ paymentDayOpt }
                                value={idPayDay}
                                onChange={ (value) => { handleSelectChange('idPayDay', value) }}
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
                                name="idMode"
                                placeholder="Modo"
                                options={ modeOpt }
                                value={idMode}
                                onChange={ (value) => { handleSelectChange('idMode', value) }}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="control-label">Estado</label>
                            <Select
                                name="idStatus"
                                placeholder="Estado"
                                options={ statusOpt }
                                value={idStatus}
                                onChange={ (value) => { handleSelectChange('idStatus', value) }}
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
            </form>  
        </>
    )
}
