import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { handleChangeController, GetSetNextId, handleGetForm } from '../../../redux/actions/normalForm'
import { Form } from 'reactstrap'
import { AddressesRepeater } from './AddressesRepeater'
import { ContactsRepeater } from './ContactsRepeater'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { save } from '../../../utility/helpers/Axios/save'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { handleCleanUp } from '../../../redux/actions/fileUpload'


const formSchema = {
    CIF: { validations: [validator.isRequired] },
    idStatus: { validations: [validator.isRequired] },
    comercialName: { validations: [validator.isRequired] },
    addresses: {
        address: { validations: [validator.isRequired] }
    },
    contacts: {
         name: {validations: [validator.isRequired] }
    }
}

export const VendorsForm = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { normalForm } = useSelector(state => state)
    const { formValidator } = useSelector(state => state)

    const { observations } = normalForm

    const vendorCode = id !== undefined ? id : normalForm.vendorCode

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    useEffect(() => {

        if (id === undefined) {
            dispatch(GetSetNextId("Vendors", "vendorCode"))
        }
        dispatch(setSchema(formSchema))
        }, [])



    const submit = async (e) => {
        e.preventDefault()
        const errors = validate(formValidator.schema, normalForm)



        if (Object.keys(errors).length !== 0) {


            dispatch(setErrors(errors))
        } else {


            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    idPaymentMethod: exceptionController(value.idPaymentMethod),
                    idVendorType: exceptionController(value.idVendorType),
                    idStatus: exceptionController(value.idStatus),
                    addresses: normalForm.addresses.map(address => ({ ...address, addressType: exceptionController(address.addressType), defaultAddress: address.defaultAddress === true ? 1 : 0 })),
                    contacts: normalForm.contacts.map(contact => ({ ...contact, department: exceptionController(contact.department), defaultContact: contact.defaultContact === true ? 1 : 0 }))
                }
                save('Vendors', id, prettyForm)
                dispatch(handleCleanUp())
                history.push('/vendors')

            })

        }


    }

    return (
        <Form onSubmit={submit}>
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

                        <Input id="CIF" name="CIF" placeholder="C.I.F" type="text" value={normalForm['CIF']} onChange={handleInputChange} label="C.I.F" />

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
