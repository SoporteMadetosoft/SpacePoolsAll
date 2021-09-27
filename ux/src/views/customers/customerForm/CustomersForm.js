import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useForm } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import { Input } from '../../../components/form/inputs/Input'

import { Select } from '../../../components/form/inputs/Select'

import { FileContext } from '../../../utility/context/FileContext'

import { handleChangeDestination, handleChangeUpload, handleCleanUp } from '../../../redux/actions/fileUpload'
import { addRepeaterRegister, GetSetNextId, handleChangeController, handleGetForm, setIdInXCode } from '../../../redux/actions/normalForm'
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

const ValidationSchema = yup.object().shape({
    customerCode: yup.number().required(),
    CIF: yup.string().required()
})

export const CustomersForm = () => {
    let {customerCode} = useSelector(state =>  state.normalForm)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [file, setFile] = useState('')
    const { upload, filePath } = useSelector(state => state.fileUpload)
    const form = useSelector(state => state.normalForm)

    const realFilePath = form.filePath ? form.filePath : filePath

    const { normalForm } = useSelector(state => state)

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { observations } = normalForm

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    useEffect(() => {
        if (normalForm.id === undefined) {
            //dispatch(setIdInXCode("Customers","customerCode"))
            dispatch(GetSetNextId("Customers", 'customerCode'))
        } else customerCode = normalForm.id

    }, [])

    const preSubmit = (filePath2) => {
        return new Promise(async (resolve, reject) => {
            if (upload === 1) {
                const swalResp = await SwalUploadAndSave()
                if (swalResp === true) {
                    const formData = new FormData()
                    formData.append('filePath', filePath2)

                    for (const element of file) {

                        formData.append('file', element)
                    }

                    await uploadFile('FileManager', formData)

                    dispatch(handleChangeDestination(filePath2))
                    dispatch(handleChangeUpload(0))
                    const data = await loadFiles('FileManager', filePath2)
                    await data.map(
                        document => (
                            dispatch(addRepeaterRegister('documents', document))
                        )
                    )
                }
            }
            resolve('')
        })
    }

    const submit = async () => {
        const filePath2 = MkDir('Customers', realFilePath)

        await preSubmit(filePath2)

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
                addresses: value.addresses.map(address => ({ ...address, addressType: exceptionController(address.addressType) })),
                contacts: value.contacts.map(contact => ({ ...contact, department: exceptionController(contact.department) }))
            }
            save('Customers', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/customers')
        })
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
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
                        {errors && errors.customerCode && <FormFeedback>Nº Cliente requerido</FormFeedback>}
                    </div>
                    <div className="col-md-4">
                        <Input name="comercialName" placeholder="Nombre" label="Nombre" />
                    </div>
                    <div className="col-md-2">
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
                    <div className="col-md-4">
                        <Input name="socialReason" placeholder="Razon social" label="Razon social" />
                    </div>
                    <div className="col-md-2">
                        <Input name="phone" placeholder="Teléfono" label="Teléfono" />
                    </div>
                    <div className="col-md-4">
                        <Input name="email" type="email" placeholder="E-mail" label="E-mail" />
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
                        <Input name="accountNumber" placeholder="Número de cuenta" label="Número de cuenta" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerType" label="Tipo de cliente" endpoint="CustomerType" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerActivity" label="Actividad" endpoint="Activity" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idCustomerCategory" label="Categoria de cliente" endpoint="CustomerCategory" />
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
