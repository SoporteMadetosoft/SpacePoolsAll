import React, { useEffect } from 'react'
import ReactSelect from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { addSelectOptions, startAddSelectOptions } from '../../../redux/actions/selects'
import '../styles/form.css'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { VehicleDocForm } from './VehicleDocForm'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'
import { useParams } from 'react-router'

export const VechiclesForm = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { observations, model } = normalForm
    const { Brand } = selectReducer
    let value

    useEffect(() => {
        dispatch(startAddSelectOptions('Brand', 'Brand'))
    }, [])

    const handleLoadModels = async (obj) => {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}/setup/vehicles/brandModel/selectByIdBrand/${obj.value}`)
        dispatch(addSelectOptions('Model', data.map(option => ({ label: option.name, value: option.id }))))
        dispatch(handleChangeController('model', ''))
    }

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }


    useEffect(() => {
        dispatch(startAddSelectOptions('Brand', 'brandOpt'))
        

    }, [])


    if (id && model) {
        if (model.idBrand !== undefined) {
            value = model && deconstructSelect(model.idBrand)
        }
    }

    return (
        <>
            <div className="card">
                <div className="row card-body">
                    <div className="col-md-2">
                        <Input name="vehicleCode" placeholder="Nº Vehículo" label="Nº Vehículo" />
                    </div>
                    <div className="col-md-2">
                        <Input name="plate" placeholder="Matrícula" label="Matrícula" />
                    </div>
                    <div className="col-md-3">
                        <Input name="frameNumber" placeholder="Número de bastidor" label="Número de bastidor" />
                    </div>
                    <div className="col-md-3">
                        <Input name="policyNumber" placeholder="Número de poliza" label="Número de poliza" />
                    </div>
                    <div className="col-md-2">
                        <Input name="tachograph" placeholder="Tacografo del camión" label="Tacografo del camión" />
                    </div>
                    <div className="col-md-4">
                        <Select name="idCarrier" label="Transportista" endpoint="Carriers" />
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
                            value={value}
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
                    <VehicleDocForm />
                </div>
            </div>
        </>
    )
}
