import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useForm } from 'react-hook-form'

import axios from 'axios'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Form, Input as InputValid, FormFeedback } from 'reactstrap'
import ReactSelect from 'react-select'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

import { FileContext } from '../../../utility/context/FileContext'

import { handleChangeDestination, handleChangeUpload, handleCleanUp } from '../../../redux/actions/fileUpload'
import { addRepeaterRegister, GetSetNextId, handleChangeController, handleGetForm, handleStartEditing } from '../../../redux/actions/normalForm'
import { addSelectOptions, startAddSelectOptions } from '../../../redux/actions/selects'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { MkDir } from '../../../utility/helpers/Axios/MkDir'
import { uploadFile } from '../../../utility/helpers/Axios/uploadFile'
import { save } from '../../../utility/helpers/Axios/save'
import { SwalUploadAndSave } from '../../../utility/helpers/SwalUploadAndSave'
import { loadFiles } from '../../../utility/helpers/Axios/loadFiles'

import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { TrailerDocForm } from './TrailerDocForm'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'

const ValidationSchema = yup.object().shape({
    plate: yup.string().required(),
    valueModel: yup.string().required()
})

const placeholderStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            FontSize: '5px'
        }
    }
}

export const TrailersForm = () => {

    let {trailerCode} = useSelector(state =>  state.normalForm)

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

    const { Brand, Model } = selectReducer

    const valueModel = normalForm['model'] ? deconstructSelect(normalForm['model']) : ''
    let brandValue
    if (id && model) {
        if (model.idBrand !== undefined) {
            brandValue = model && deconstructSelect(model.idBrand)
        }
    }
    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Trailers', id))
        }
        dispatch(startAddSelectOptions('Brand', 'Brand'))
        dispatch(startAddSelectOptions('Model', 'Model'))
        if (normalForm.id === undefined) {
            dispatch(GetSetNextId("Trailers",'trailerCode'))
        } else trailerCode = normalForm.id
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
        dispatch(handleChangeController('model', { id: value, name: label }))
    }

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
        const filePath2 = MkDir('Trailers', realFilePath)
        await preSubmit(filePath2)

        const form2 = dispatch(handleGetForm())
        form2.then(async (value) => {
            const prettyForm = {
                ...value,
                idStatus: exceptionController(value.idStatus),
                model: exceptionController(value.model),
                filePath: filePath2
            }

            save('Trailers', id, prettyForm)
            dispatch(handleCleanUp())
            history.push('/porters/trailers')
        })
    }

    console.log(valueModel)

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <div className="card">
                <div className="row card-body">
                    <div className="col-md-3">
                    <label className="control-label">Nº Remolque</label>
                        <input
                        className={`form-control`}
                        name="trailerCode"
                        value={trailerCode}
                        readOnly
                    />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Matrícula del remolque</label>
                        <InputValid
                            id="plate"
                            name="plate"
                            type="text"
                            value={normalForm['plate']}
                            placeholder="Matrícula del remolque"
                            innerRef={register({ required: true })}
                            invalid={errors.plate && true}
                            onChange={handleInputChange}
                        />
                        {errors && errors.plate && <FormFeedback>Matrícula del remolque requerida</FormFeedback>}
                    </div>
                    <div className="col-md-3">
                        <Input name="frame" label="Número de bastidor" />
                    </div>
                    <div className="col-md-3">
                        <Input name="policyNumber" label="Número de poliza" />
                    </div>
                    <div className="col-md-3">
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
                    <div className="col-md-3">
                        <label className="control-label">Modelo</label>
                        <ReactSelect
                            id="model"
                            name="model"
                            options={Model}
                            value={valueModel}
                            styles={placeholderStyles}
                            placeholder="Modelo"
                            onChange={handleSelectChange}
                        />
                         <InputValid
                                    id="valueModel"
                                    name="valueModel"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={valueModel}
                                    innerRef={register({ required: true })}
                                    invalid={errors.valueModel && true}
                                    style={{ opacity: 0, height: 0, position: 'absolute' }}
                                    onChange={handleInputChange}
                                />
                        {errors && errors.valueModel && (
                            <>
                                <FormFeedback>Modelo requerido</FormFeedback>
                            </>
                        )}
                    </div>

                    <div className="col-md-3">
                        <Input name="mma" type="number" label="MMA" />
                    </div>
                    <div className="col-md-3">
                        <Input name="ITVdate" type="date" label="Fecha ITV" />
                    </div>
                    <div className="col-md-3">
                        <Input name="maintenanceDate" type="date" label="Fecha de mantenimiento" />
                    </div>
                    <div className="col-md-3">
                        <Input name="insuranceNumber" label="Número de seguro" />
                    </div>
                    <div className="col-md-3">
                        <Input name="insuranceDateLimit" type="date" label="Fecha caducidad seguro" />
                    </div>
                    <div className="col-md-3">
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
                        <TrailerDocForm />
                    </FileContext.Provider>

                </div>
            </div>
            <ActionButtons />

        </Form>
    )
}
