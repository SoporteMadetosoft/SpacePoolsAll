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
import { addRepeaterRegister, handleGetForm, setIdInXCode } from '../../../redux/actions/normalForm'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { MkDir } from '../../../utility/helpers/Axios/MkDir'
import { uploadFile } from '../../../utility/helpers/Axios/uploadFile'
import { save } from '../../../utility/helpers/Axios/save'
import { SwalUploadAndSave } from '../../../utility/helpers/SwalUploadAndSave'
import { loadFiles } from '../../../utility/helpers/Axios/loadFiles'

import { ActionButtons } from '../../../components/actionButtons/ActionButtons'

import { CarrierDocForm } from './CarrierDocForm'

const ValidationSchema = yup.object().shape({
    carrierCode: yup.number().required(),
    NIF: yup.string().required()
})

export const CarriersForm = () => {
    let {carrierCode} = useSelector(state =>  state.normalForm)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [file, setFile] = useState('')
    const { upload, filePath } = useSelector(state => state.fileUpload)
    const form = useSelector(state => state.normalForm)

    const realFilePath = form.filePath ? form.filePath : filePath

    const { normalForm } = useSelector(state => state)

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    useEffect(() => {
        if (normalForm.id === undefined) {
            dispatch(setIdInXCode("Carriers","carrierCode"))
        } else carrierCode = normalForm.id
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
        const filePath2 = MkDir('Carriers', realFilePath)

        await preSubmit(filePath2)

        const form2 = dispatch(handleGetForm())
        form2.then(async (value) => {
            const prettyForm = {
                ...value,
                idStatus: exceptionController(value.idStatus),
                filePath: filePath2
            }
            await save('Carriers', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/porters/carriers')
        })
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-2">
                    <label className="control-label">Nº Transportista</label>
                        <input
                        className={`form-control`}
                        name="carrierCode"
                        value={carrierCode}
                        readOnly
                    />
                    </div>
                    <div className="col-md-4">
                        <Input name="name" placeholder="Nombre" label="Nombre" />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">N.I.F.</label>
                        <InputValid
                            id="NIF"
                            name="NIF"
                            type="text"
                            value={normalForm['NIF']}
                            placeholder="N.I.F."
                            innerRef={register({ required: true })}
                            invalid={errors.NIF && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.NIF && <FormFeedback>N.I.F. requerido</FormFeedback>}
                    </div>
                    <div className="col-md-3">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
                    </div>
                    <div className="col-md-3">
                        <Input name="email" type="email" placeholder="Correo electrónico" label="Correo electrónico" />
                    </div>
                    <div className="col-md-3">
                        <Input name="phone" placeholder="Teléfono 1" label="Teléfono 1" />
                    </div>
                    <div className="col-md-3">
                        <Input name="phone2" placeholder="Teléfono 2" label="Teléfono 2" />
                    </div>
                    <div className="col-md-3">
                        <Input name="startSchedule" type="time" placeholder="Horario de contacto" label="Horario de contacto" />
                    </div>
                    <div className="col-md-4">
                        <Input name="country" placeholder="País" label="País" />
                    </div>
                    <div className="col-md-4">
                        <Input name="state" placeholder="Provincia" label="Provincia" />
                    </div>
                    <div className="col-md-4">
                        <Input name="city" placeholder="Ciudad" label="Ciudad" />
                    </div>
                    <div className="col-md-8">
                        <Input name="address" placeholder="Dirección" label="Dirección" />
                    </div>
                    <div className="col-md-4">
                        <Input name="postcode" placeholder="Código postal" label="Código postal" />
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
