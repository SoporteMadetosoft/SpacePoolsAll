import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ReactSelect from 'react-select'

import { handleChangeController, handleStartEditing } from '../../../redux/actions/normalForm'
import { addSelectOptions, startAddSelectOptions } from '../../../redux/actions/selects'
import { useParams } from 'react-router-dom'
import { Input } from '../../../components/form/inputs/Input'
import { Select } from '../../../components/form/inputs/Select'
import { TrailerDocForm } from './TrailerDocForm'


export const TrailersForm = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Trailers', id))
        }
    }, [])

    const { normalForm, selectReducer } = useSelector(state => state)
    const { observations, brand } = normalForm

    const { brandOpt } = selectReducer

    const handleLoadModels = async (obj) => {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}/setup/vehicles/brandModel/selectByIdBrand/${obj.value}`)
        dispatch(addSelectOptions('brandModelOpt', data.map(option => ({ label: option.name, value: option.id }))))
        dispatch(handleChangeController('model', ''))
    }

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions('Brand', 'brandOpt'))
    }, [])

    return (
        <>
            <div className="card">
                <div className="row card-body">
                    <div className="col-md-3">
                        <Input name="trailerCode" placeholder="Nº Remolque" label="Nº Remolque" />
                    </div>
                    <div className="col-md-3">
                        <Input name="plate" placeholder="Matrícula del remolque" label="Matrícula del remolque" />
                    </div>
                    <div className="col-md-3">
                        <Input name="policyNumber" placeholder="Número de poliza" label="Número de poliza" />
                    </div>
                    <div className="col-md-3">
                        <Select name="idStatus" label="Estado" endpoint="Status" />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Marca</label>
                        <ReactSelect
                            placeholder="Marca"
                            name="brand"
                            value={brand}
                            options={brandOpt}
                            onChange={(obj) => {
                                handleLoadModels(obj)
                            }} />
                    </div>
                    <div className="col-md-3">
                        <Select name="model" label="Modelo" endpoint="brandModelOpt" />
                    </div>

                    <div className="col-md-3">
                        <Input name="ITVdate" type="date" placeholder="Fecha ITV" label="Fecha ITV" />
                    </div>
                    <div className="col-md-3">
                        <Input name="maintenanceDate" type="date" placeholder="Fecha de mantenimiento" label="Fecha de mantenimiento" />
                    </div>
                    <div className="col-md-3">
                        <Input name="insuranceNumber" placeholder="Número de seguro" label="Número de seguro" />
                    </div>
                    <div className="col-md-3">
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
            <div className="card">
                <div className="card-body">
                    <TrailerDocForm />
                </div>
            </div>
        </>
    )
}
