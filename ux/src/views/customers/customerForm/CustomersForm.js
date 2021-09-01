import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'

import { AddressesRepeater } from './AddressesRepeater'
import { ContactsRepeater } from './ContactsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

export const CustomersForm = () => {

    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)

    const { observations } = normalForm

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

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="customerCode" placeholder="Nº Cliente" label="Nº Cliente" />
                    </div>
                    <div className="col-md-4">
                        <Input name="comercialName" placeholder="Nombre" label="Nombre" />
                    </div>
                    <div className="col-md-2">
                        <Input name="CIF" placeholder="C.I.F." label="C.I.F." />
                    </div>
                    <div className="col-md-2">
                        <Input name="socialReason" placeholder="Razon social" label="Razon social" />
                    </div>
                    <div className="col-md-2">
                        <Input name="phone" placeholder="Teléfono" label="Teléfono" />
                    </div>
                    <div className="col-md-2">
                        <Input name="comercialNum" placeholder="Número Comercial" label="Número Comercial" />
                    </div>
                    <div className="col-md-4">
                        <Input name="email" type="email" placeholder="E-mail" label="E-mail" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idPaymentMethod" label="Forma de pago" options={paymentMethodOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idPayDay" label="Día de pago" options={paymentDayOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerOrigin" label="Origen" options={customerOriginOpt} />
                    </div>
                    <div className="col-md-2">
                        <Input name="accountNumber" placeholder="Número de cuenta" label="Número de cuenta" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerType" label="Tipo de cliente" options={customerTypeOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerActivity" label="Actividad" options={customerActivityOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerCategory" label="Categoria de cliente" options={customerCategoryOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idMode" label="Modo" options={modeOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idStatus" label="Estado" options={statusOpt} />
                    </div>
                    <div className="col-md-2">
                        <Select name="idLanguage" label="Idioma" options={languageOpt} />
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
        </>
    )
}
