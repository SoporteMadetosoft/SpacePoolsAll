import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useForm } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import ReactSelect from 'react-select'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

import { FileContext } from '../../../utility/context/FileContext'

import { handleChangeDestination, handleChangeUpload, handleCleanUp } from '../../../redux/actions/fileUpload'
import { addRepeaterRegister, handleChangeController, handleGetForm } from '../../../redux/actions/normalForm'
import { addSelectOptions, startAddSelectOptions } from '../../../redux/actions/selects'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { MkDir } from '../../../utility/helpers/Axios/MkDir'
import { uploadFile } from '../../../utility/helpers/Axios/uploadFile'
import { save } from '../../../utility/helpers/Axios/save'
import { SwalUploadAndSave } from '../../../utility/helpers/SwalUploadAndSave'
import { loadFiles } from '../../../utility/helpers/Axios/loadFiles'

import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { VehicleDocForm } from './VehicleDocForm'

import '../styles/form.css'

const ValidationSchema = yup.object().shape({
    vehicleCode: yup.number().required(),
    plate: yup.string().required(),
    frameNumber: yup.string().required(),
    valueCarrier: yup.string().required()
})

const placeholderStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            FontSize: '5px'
        }
    }
}

export const VechiclesForm = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [file, setFile] = useState('')
    const { upload, filePath } = useSelector(state => state.fileUpload)
    const form = useSelector(state => state.normalForm)
    const realFilePath = form.filePath ? form.filePath : filePath

    const { normalForm, selectReducer } = useSelector(state => state)

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(ValidationSchema) })

    const { observations, model } = normalForm
    const { Brand, Carriers } = selectReducer
    let brandValue

    useEffect(() => {
        dispatch(startAddSelectOptions('Brand', 'Brand'))
        dispatch(startAddSelectOptions('Carriers', 'Carriers'))
    }, [])

    const handleLoadModels = async (obj) => {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}/setup/vehicles/brandModel/selectByIdBrand/${obj.value}`)
        dispatch(addSelectOptions('Model', data.map(option => ({ label: option.name, value: option.id }))))
        dispatch(handleChangeController('model', ''))
    }

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleChangeController('idCarrier', { id: value, name: label }))
    }


    if (id && model) {
        if (model.idBrand !== undefined) {
            brandValue = model && deconstructSelect(model.idBrand)
        }
    }
    const valueCarrier = normalForm['idCarrier'] ? deconstructSelect(normalForm['idCarrier']) : ''


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
        const filePath2 = MkDir('Vehicles', realFilePath)
        await preSubmit(filePath2)

        const form2 = dispatch(handleGetForm())
        form2.then(async (value) => {
            const prettyForm = {
                ...value,
                idStatus: exceptionController(value.idStatus),
                model: exceptionController(value.model),
                idCarrier: exceptionController(value.idCarrier),
                idTrailer: exceptionController(value.idTrailer),
                filePath: filePath2
            }

            save('Vehicles', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/porters/vehicles')
        })

    }
    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className="row card-body">
                    <div className="col-md-2">
                        <label className="control-label">Nº Vehículo</label>
                        <InputValid
                            id="vehicleCode"
                            name="vehicleCode"
                            type="number"
                            value={normalForm['vehicleCode']}
                            placeholder="Nº Vehículo"
                            innerRef={register({ required: true })}
                            invalid={errors.vehicleCode && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.vehicleCode && <FormFeedback>Nº Vehículo requerido</FormFeedback>}
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Matrícula</label>
                        <InputValid
                            id="plate"
                            name="plate"
                            type="text"
                            value={normalForm['plate']}
                            placeholder="Matrícula"
                            innerRef={register({ required: true })}
                            invalid={errors.plate && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.vehicleCode && <FormFeedback>Matrícula requerida</FormFeedback>}
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Número de bastidor</label>
                        <InputValid
                            id="frameNumber"
                            name="frameNumber"
                            type="text"
                            value={normalForm['frameNumber']}
                            placeholder="Número de bastidor"
                            innerRef={register({ required: true })}
                            invalid={errors.frameNumber && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.frameNumber && <FormFeedback>Número de bastidor requerido</FormFeedback>}
                    </div>
                    <div className="col-md-3">
                        <Input name="policyNumber" placeholder="Número de poliza" label="Número de poliza" />
                    </div>
                    <div className="col-md-2">
                        <Input name="tachograph" placeholder="Tacografo del camión" label="Tacografo del camión" />
                    </div>
                    <div className="col-md-4">
                        <label className="control-label">Transportista</label>
                        <ReactSelect
                            id="idCarrier"
                            name="idCarrier"
                            options={Carriers}
                            value={valueCarrier}
                            styles={placeholderStyles}
                            placeholder="Transportista"
                            onChange={handleSelectChange}
                        />
                        {errors && errors.valueCarrier && (
                            <>
                                <InputValid
                                    id="valueCarrier"
                                    name="valueCarrier"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={valueCarrier}
                                    innerRef={register({ required: true })}
                                    invalid={errors.itemCode && true}
                                    style={{ opacity: 0, height: 0, position: 'absolute' }}
                                    onChange={handleInputChange}
                                />
                                <FormFeedback>Transportista requerido</FormFeedback>
                            </>
                        )}
                    </div>
                    <div className="col-md-2">
                        <Input name="tare" placeholder="Tara" label="Tara" />
                    </div>
                    <div className="col-md-2 ">
                        <Input name="mma" placeholder="M.M.A." label="M.M.A." />
                    </div>

                    <div className="col-md-2">
                        <label className="control-label">Marca</label>
                        <ReactSelect
                            placeholder="Marca"
                            name="brand"
                            value={brandValue}
                            options={Brand}
                            onChange={(obj) => {
                                handleLoadModels(obj)
                            }} />
                    </div>
                    <div className="col-md-2">
                        <Select name="model" label="Modelo" endpoint="Model" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idTrailer" label="Remolque" endpoint="Trailers" labelName="plate" />
                    </div>
                    <div className="col-md-2">
                        <Input name="ITVdate" type="date" placeholder="Fecha ITV" label="Fecha ITV" />
                    </div>
                    <div className="col-md-2">
                        <Input name="maintenanceDate" type="date" placeholder="Fecha de mantenimiento" label="Fecha de mantenimiento" />
                    </div>
                    <div className="col-md-2">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
                    </div>
                    <div className="col-md-12">
                        <label className="control-label">Observaciones</label>
                        <textarea
                            className="form-control"
                            placeholder="Observaciones"
                            name="observations"
                            defaultValue={observations}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <FileContext.Provider value={{ file, setFile }}>
                        <VehicleDocForm />
                    </FileContext.Provider>
                </div>
            </div>
            <ActionButtons />
        </Form>
    )
}
