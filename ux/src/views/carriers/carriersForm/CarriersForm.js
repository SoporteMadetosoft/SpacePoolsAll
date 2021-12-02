import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

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

import { CarrierDocForm } from './CarrierDocForm'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import fileUpload from 'express-fileupload'
import { preSubmit } from '../../../components/preSubmit/preSubmit'


const formSchema = {
    NIF: { validations: [validator.isRequired] },
    idStatus: { validations: [validator.isRequired] }
}

export const CarriersForm = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [file, setFile] = useState([])
    const { upload, filePath } = fileUpload
    const form = useSelector(state => state.normalForm)

    const realFilePath = form.filePath ? form.filePath : filePath

    const { normalForm, formValidator } = useSelector(state => state)

    const carrierCode = id !== undefined ? id : normalForm.carrierCode

    useEffect(() => {
        if (id === undefined) {
            dispatch(GetSetNextId("Carriers", 'carrierCode'))
        } 
        dispatch(setSchema(formSchema))
    }, [])

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, form)


        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const filePath2 = MkDir('Carriers', realFilePath)

            const totalDocs = await preSubmit(filePath2, upload, file, form.documents)

            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    idUser: exceptionController(value.idUser),
                    idStatus: exceptionController(value.idStatus),
                    filePath: filePath2,
                    documents : totalDocs
                }
                save('Carriers', id, prettyForm)
                dispatch(handleCleanUp())
                history.push('/porters/carriers')
            })
        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                        <Input name="carrierCode" label="Nº Transportista" readonly='readonly' value={carrierCode} />
                    </div>
                    <div className="col-md-4">
                        <Input name="name" label="Nombre" />
                    </div>
                    <div className="col-md-3">
                        <Input required="true" name="NIF" type="text" label="N.I.F." endpoint="Carriers" />
                    </div>
                    <div className="col-md-3">
                        <Select required="true" name="idStatus" label="Estado" endpoint="Status" />
                    </div>
                    <div className="col-md-3">
                        <Input name="email" type="email" label="Correo electrónico" />
                    </div>
                    <div className="col-md-3">
                        <Input name="phone" label="Teléfono" />
                    </div>
                    <div className="col-md-3">
                        <Input name="phone2" label="Móvil" />
                    </div>
                    <div className="col-md-3">
                        <Input name="startSchedule" type="time" label="Horario de contacto" />
                    </div>
                    <div className="col-md-4">
                        <Input name="country" label="País" />
                    </div>
                    <div className="col-md-4">
                        <Input name="state" label="Provincia" />
                    </div>
                    <div className="col-md-4">
                        <Input name="city" label="Ciudad" />
                    </div>
                    <div className="col-md-4">
                        <Input name="address" label="Dirección" />
                    </div>
                    <div className="col-md-4">
                        <Input name="postcode" label="Código postal" />
                    </div>
                    <div className="col-md-4">
                        <Select name="idUser" label="Usuario" endpoint="Users" labelName='fullname' />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <FileContext.Provider value={{ file, setFile }}>
                        <CarrierDocForm />
                    </FileContext.Provider>

                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
