import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'

import { AddressesRepeater } from './AddressesRepeater'
import { ContactsRepeater } from './ContactsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

export const VendorsForm = () => {

    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)

    const { observations } = normalForm

    const {
        paymentMethodOpt,
        vendorTypesOpt,
        statusOpt } = selectReducer

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="vendorCode" placeholder="Nº Proveedor" label="Nº Proveedor" />
                    </div>
                    <div className="col-md-4">
                        <Input name="comercialName" placeholder="Nombre Comercial" label="Nombre Comercial" />
                    </div>
                    <div className="col-md-3">
                        <Input name="CIF" placeholder="C.I.F." label="C.I.F." />
                    </div>
                    <div className="col-md-3">
                        <Input name="socialReason" placeholder="Razon social" label="Razon social" />
                    </div>
                    <div className="col-md-3">
                        <Input name="phone" placeholder="Teléfono" label="Teléfono" />
                    </div>
                    <div className="col-md-3">
                        <Input name="email" type="email" placeholder="Correo electrónico" label="Correo electrónico" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idPaymentMethod" label="Forma de pago" options={paymentMethodOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idVendorType" label="Tipo de proveedor" options={vendorTypesOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idStatus" label="Estado" options={statusOpt} />
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
