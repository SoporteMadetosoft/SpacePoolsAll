import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import { Form } from 'reactstrap'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { FileContext } from '../../../utility/context/FileContext'
import { handleCleanUp } from '../../../redux/actions/fileUpload'
import { GetSetNextId, handleChangeController, handleGetForm } from '../../../redux/actions/normalForm'
import { addSelectOptions, startAddSelectOptions, startAddSelectStatus } from '../../../redux/actions/selects'
import { exceptionController } from '../../../utility/helpers/undefinedExceptionController'
import { MkDir } from '../../../utility/helpers/Axios/MkDir'
import { save } from '../../../utility/helpers/Axios/save'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { VehicleDocForm } from './VehicleDocForm'
import '../styles/form.css'
import { validate, validator } from '../../../utility/formValidator/ValidationTypes'
import { setErrors, setSchema } from '../../../redux/actions/formValidator'
import { preSubmit } from '../../../components/preSubmit/preSubmit'
import fileUpload from 'express-fileupload'


const formSchema = {

    plate: { validations: [validator.isRequired] },
    frameNumber: { validations: [validator.isRequired] },
    brand: { validations: [validator.isRequired] },
    model: { validations: [validator.isRequired] },
    idStatus: { validations: [validator.isRequired] },
    idCarrier: { validations: [validator.isRequired] }

}

export const VechiclesForm = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [file, setFile] = useState([])
    const { upload, filePath } = fileUpload

    const form = useSelector(state => state.normalForm)
    const realFilePath = form.filePath ? form.filePath : filePath

    const { normalForm, formValidator } = useSelector(state => state)
    const vehicleCode = id !== undefined ? id : normalForm.vehicleCode

    const { observations } = normalForm

    useEffect(() => {
        dispatch(startAddSelectOptions('Brand', 'Brand'))
        dispatch(startAddSelectStatus('Carriers', 'Carriers', 'name'))
    }, [])


    const handleSelectChange = (name, { value, label }) => {
        dispatch(handleChangeController(name, { id: value, name: label }))
    }

    const handleLoadModels = async (obj) => {
        const token = localStorage.getItem('accessToken') || ''

        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}/setup/vehicles/model/selectByIdBrand/${obj.value}`, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        })
        dispatch(addSelectOptions('Model', data.map(option => ({ label: option.name, value: option.id }))))
        dispatch(handleChangeController('model', ''))
        handleSelectChange('brand', obj)
    }

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }


    useEffect(() => {
        dispatch(startAddSelectOptions('Brand', 'brandOpt'))
        if (id === undefined) {
            dispatch(GetSetNextId("Vehicles", 'vehicleCode'))
        } 
        dispatch(setSchema(formSchema))
    }, [])

    const submit = async (e) => {
        e.preventDefault()

        const errors = validate(formValidator.schema, form)

        if (Object.keys(errors).length !== 0) {
            dispatch(setErrors(errors))

        } else {
            const filePath2 = MkDir('Vehicles', realFilePath)
            const totalDocs = await preSubmit(filePath2, upload, file, form.documents)

            const form2 = dispatch(handleGetForm())
            form2.then(async (value) => {
                const prettyForm = {
                    ...value,
                    idStatus: exceptionController(value.idStatus),
                    model: exceptionController(value.model),
                    idCarrier: exceptionController(value.idCarrier),
                    idTrailer: exceptionController(value.idTrailer),
                    filePath: filePath2,
                    documents : totalDocs,
                    brand: exceptionController(value.brand)
                }

                save('Vehicles', id, prettyForm)
                dispatch(handleCleanUp())
                history.push('/porters/vehicles')
            })

        }
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className="row card-body">
                    <div className="col-md-2">
                        <label className="control-label">Nº Vehículo</label>
                        <input
                            className={`form-control`}
                            name="vehicleCode"
                            value={vehicleCode}
                            readOnly
                        />
                    </div>
                    <div className="col-md-2">
                        <Input required="true" type="text" name="plate" label="Matrícula" endpoint="Vehicles" />

                    </div>
                    <div className="col-md-3">
                        <Input required="true" type="text" name="frameNumber" label="Número de bastidor" />

                    </div>
                    <div className="col-md-3">
                        <Input name="policyNumber" label="Número de poliza" />
                    </div>
                    <div className="col-md-2">
                        <Input name="tachograph" label="Tacografo del camión" />
                    </div>
                    <div className="col-md-4">
                        <Select required="true" name="idCarrier" label="Transportista" endpoint="Carriers" />

                    </div>
                    <div className="col-md-2">
                        <Input name="tare" label="Tara" />
                    </div>
                    <div className="col-md-2 ">
                        <Input name="mma" label="M.M.A." />
                    </div>

                    <div className="col-md-2">
                        <Select
                            required="true"
                            name="brand"
                            label="Marca"
                            // onSelect={(obj) => {
                            //     handleLoadModels(obj)
                            // }}
                            endpoint="Brand"
                        />
                    </div>
                    <div className="col-md-2">
                        <Select
                            required="true"
                            name="model"
                            label="Modelo"
                            endpoint="Model"
                        />
                    </div>
                    <div className="col-md-2">
                        <Select name="idTrailer" label="Remolque" endpoint="Trailers" labelName="plate" />
                    </div>
                    <div className="col-md-2">
                        <Input name="ITVdate" type="date" placeholder="Fecha ITV" label="Fecha ITV" />
                    </div>
                    <div className="col-md-2">
                        <Input name="maintenanceDate" type="date" label="Fecha de mantenimiento" />
                    </div>
                    <div className="col-md-2">
                        <Select required="true" name="idStatus" label="Estado" endpoint="Status" />
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
