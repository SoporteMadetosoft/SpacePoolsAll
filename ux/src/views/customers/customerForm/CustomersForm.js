import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { Form } from 'reactstrap'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { FileContext } from '../../../utility/context/FileContext'
import { handleChangeDestination, handleChangeUpload, handleCleanUp } from '../../../redux/actions/fileUpload'
import { addRepeaterRegister, GetSetNextId, handleChangeController, handleGetForm } from '../../../redux/actions/normalForm'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { MkDir } from '../../../utility/helpers/Axios/MkDir'
import { uploadFile } from '../../../utility/helpers/Axios/uploadFile'
import { save } from '../../../utility/helpers/Axios/save'
import { SwalUploadAndSave } from '../../../utility/helpers/SwalUploadAndSave'
import { loadFiles } from '../../../utility/helpers/Axios/loadFiles'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { AddressesRepeater } from './AddressesRepeater'
import { ContactsRepeater } from './ContactsRepeater'
import { CustomerDocForm } from './CustomerDocForm'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'
import fileUpload from 'express-fileupload'
import { preSubmit } from '../../../components/preSubmit/preSubmit'

const formSchema = {
    comercialName: { validations: [validator.isRequired] },
    email: { validations: [validator.isEmail] },
    CIF: { validations: [validator.isRequired] },
    idStatus: { validations: [validator.isRequired] }
}

export const CustomersForm = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [file, setFile] = useState([])
    const { upload, filePath } = fileUpload
    const form = useSelector(state => state.normalForm)

    const realFilePath = form.filePath ? form.filePath : filePath

    const { normalForm } = useSelector(state => state)
    const { formValidator } = useSelector(state => state)

    const { observations } = normalForm
    const customerCode = id !== undefined ? id : normalForm.customerCode

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }
    useEffect(() => {
        if (id === undefined) {
            dispatch(GetSetNextId("Customers", 'customerCode'))
        } 
        dispatch(setSchema(formSchema))

    }, [])


    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, normalForm)


        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const filePath2 = MkDir('Customers', realFilePath)

            const totalDocs = await preSubmit(filePath2, upload, file, form.documents)

            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    idPaymentMethod: exceptionController(value.idPaymentMethod),
                    idPayDay: exceptionController(value.idPayDay),
                    idCustomerOrigin: exceptionController(value.idCustomerOrigin),
                    idCustomerType: exceptionController(value.idCustomerType),
                    idCustomerActivity: exceptionController(value.idCustomerActivity),
                    idCustomerCategory: exceptionController(value.idCustomerCategory),
                    idMode: exceptionController(value.idMode),
                    idStatus: exceptionController(value.idStatus),
                    idLanguage: exceptionController(value.idLanguage),
                    filePath: filePath2,
                    documents : totalDocs,
                    addresses: value.addresses.map(address => ({ ...address, addressType: exceptionController(address.addressType), defaultAddress: address.defaultAddress === true ? 1 : 0 })),
                    contacts: value.contacts.map(contact => ({ ...contact, department: exceptionController(contact.department), defaultContact: contact.defaultContact === true ? 1 : 0 }))
                }
                save('Customers', id, prettyForm)
                dispatch(handleCleanUp())
                history.push('/customers')
            })
        }

    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <label className="control-label">Nº Cliente</label>
                        <input
                            className={`form-control`}
                            name="customerCode"
                            value={customerCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        <Input name="comercialName" label="Nombre" />
                    </div>
                    <div className="col-md-2">
                        <Input id="CIF" name="CIF" type="text" value={normalForm['CIF']} placeholder="C.I.F." onChange={handleInputChange} label="C.I.F" />
                    </div>
                    <div className="col-md-4">
                        <Input name="socialReason" label="Razón social" />
                    </div>
                    <div className="col-md-2">
                        <Input name="phone" label="Teléfono" />
                    </div>
                    <div className="col-md-4">
                        <Input name="email" type="email" label="E-mail" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idPaymentMethod" label="Forma de pago" endpoint="PaymentMethods" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idPayDay" label="Día de pago" endpoint="PayDay" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerOrigin" label="Origen" endpoint="Origin" />
                    </div>
                    <div className="col-md-2">
                        <Input name="accountNumber" label="Número de cuenta" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerType" label="Tipo de cliente" endpoint="CustomerType" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerActivity" label="Actividad" endpoint="Activity" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerCategory" label="Categoría de cliente" endpoint="CustomerCategory" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idMode" label="Modo" endpoint="Mode" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idLanguage" label="Idioma" endpoint="Language" />
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
            <div className="card">
                <div className="card-body">
                    <FileContext.Provider value={{ file, setFile }}>
                        <CustomerDocForm />
                    </FileContext.Provider>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}

