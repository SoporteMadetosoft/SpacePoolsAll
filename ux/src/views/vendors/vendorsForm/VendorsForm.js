import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { handleChangeController, GetSetNextId } from '../../../redux/actions/normalForm'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Form, Input as InputValid, FormFeedback } from 'reactstrap'

import { AddressesRepeater } from './AddressesRepeater'
import { ContactsRepeater } from './ContactsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { save } from '../../../utility/helpers/Axios/save'
import { startAddSelectStatus } from '../../../redux/actions/selects'

const ValidationSchema = yup.object().shape({
    CIF: yup.string().required()
})

export const VendorsForm = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    let { vendorCode } = useSelector(state => state.normalForm)

    const { normalForm } = useSelector(state => state)

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { observations } = normalForm

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }



    useEffect(() => {

        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Vendors", "vendorCode"))

        } else vendorCode = normalForm.id



    }, [])

    console.log(errors)

    const submit = async () => {
        const prettyForm = {
            ...normalForm,
            idPaymentMethod: exceptionController(normalForm.idPaymentMethod),
            idVendorType: exceptionController(normalForm.idVendorType),
            idStatus: exceptionController(normalForm.idStatus),
            addresses: normalForm.addresses.map(address => ({ ...address, addressType: exceptionController(address.addressType), defaultAddress: address.defaultAddress === true ? 1 : 0 })),
            contacts: normalForm.contacts.map(contact => ({ ...contact, department: exceptionController(contact.department), defaultContact: contact.defaultContact === true ? 1 : 0 }))
        }
        save('Vendors', id, prettyForm)
        history.push('/vendors')
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Proveedor</label>
                        <input
                            className={`form-control`}
                            name="vendorCode"
                            value={vendorCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        <Input name="comercialName" label="Nombre Comercial" />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">C.I.F.</label>
                        <InputValid
                            id="CIF"
                            name="CIF"
                            type="text"
                            value={normalForm['CIF']}
                            placeholder="C.I.F."
                            innerRef={register({ required: true })}
                            invalid={errors.CIF && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.CIF && <FormFeedback>C.I.F. requerido</FormFeedback>}
                    </div>
                    <div className="col-md-3">
                        <Input name="socialReason" label="Razón social" />
                    </div>
                    <div className="col-md-3">
                        <Input name="phone" label="Teléfono" />
                    </div>
                    <div className="col-md-3">
                        <Input name="email" label="Correo electrónico" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idPaymentMethod" label="Forma de pago" endpoint="PaymentMethods" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idVendorType" label="Tipo de proveedor" endpoint="VendorType" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idOrigin" label="Origen" endpoint="Origin" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
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
            <ActionButtons />
        </Form>
    )
}
