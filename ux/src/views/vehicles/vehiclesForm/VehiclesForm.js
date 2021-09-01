import React from 'react'
import ReactSelect from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { addSelectOptions } from '../../../redux/actions/selects'
import '../styles/form.css'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'

export const VechiclesForm = () => {

    const dispatch = useDispatch()

    const { normalForm, selectReducer } = useSelector(state => state)
    const { observations } = normalForm

    const { brandOpt, carriersOpt, brandModelOpt, trailersOpt } = selectReducer

    const handleLoadModels = async (obj) => {
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URI}/setup/vehicles/brandModel/selectByIdBrand/${obj.value}`)
        dispatch(addSelectOptions('brandModelOpt', data.data))
        dispatch(handleChangeController('model', ''))
    }

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <>
            <div className="card">
                <div className="row card-body">
                    <div className="col-md-2">
                        <Input name="vehicleCode" placeholder="Nº Vehículo" label="Nº Vehículo" />
                    </div>
                    <div className="col-md-2">
                        <Input name="plateNumber" placeholder="Matrícula" label="Matrícula" />
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
                        <Select name="carrierId" label="Transportista" options={carriersOpt} />
                    </div>
                    <div className="col-md-2">
                        <Input name="tara" placeholder="Tara" label="Tara" />
                    </div>
                    <div className="col-md-2 ">
                        <Input name="MMA" placeholder="M.M.A." label="M.M.A." />
                    </div>

                    <div className="col-md-2">
                        <label className="control-label">Marca</label>
                        <ReactSelect
                            placeholder="Marca"
                            options={brandOpt}
                            onChange={(obj) => {
                                handleLoadModels(obj)
                            }} />
                    </div>
                    <div className="col-md-2">
                        <Select name="model" label="Modelo" options={brandModelOpt} />

                    </div>
                    <div className="col-md-2">
                        <Select name="trailerId" label="Remolque" options={trailersOpt} />
                    </div>
                    <div className="col-md-2">
                        <Input name="itvDate" type="date" placeholder="Fecha ITV" label="Fecha ITV" />
                    </div>
                    <div className="col-md-2">
                        <Input name="maintenanceDate" type="date" placeholder="Fecha de mantenimiento" label="Fecha de mantenimiento" />
                    </div>
                    <div className="col-md-2">
                        <Input name="insuranceDateLimit" type="date" placeholder="Fecha caducidad seguro" label="Fecha caducidad seguro" />
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
        </>
    )
}
