import React, { useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { handleChangeController, handleStartEditing } from '../../../redux/actions/normalForm'
import { DocumentsRepeater } from './DocumentsRepeater'
import { addSelectOptions } from '../../../redux/actions/selects'
import { useParams } from 'react-router-dom'


export const TrailersForm = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Trailers', id))
        }
    }, [])

    const { normalForm, selectReducer } = useSelector(state => state)
    const {
        trailerCode,
        idStatus,
        plate,
        model,
        ITVdate,
        policyNumber,
        insuranceNumber,
        insuranceDateLimit,
        maintenanceDate,
        observations,
        brand } = normalForm

    const { statusOpt, brandOpt, brandModelOpt } = selectReducer

    const handleLoadModels = async (obj) => {
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URI}/setup/vehicles/brandModel/selectByIdBrand/${obj.value}`)
        dispatch(addSelectOptions('brandModelOpt', data.data))
        dispatch(handleChangeController('model', ''))
    }

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = (key, value) => {
        dispatch(handleChangeController(key, value))
    }

    return (
        <>
            <div className="card">
                <div className="row card-body">
                    <div className="col-md-3">
                        <label className="control-label">Nº Remolque</label>
                        <input
                            className="form-control"
                            placeholder="Nº Remolque"
                            name="trailerCode"
                            onChange={handleInputChange}
                            value={trailerCode} />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Matrícula del remolque</label>
                        <input
                            className="form-control"
                            placeholder="Matrícula"
                            name="plate"
                            onChange={handleInputChange}
                            value={plate} />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Número de poliza</label>
                        <input
                            className="form-control"
                            placeholder="Número de bastidor"
                            name="policyNumber"
                            onChange={handleInputChange}
                            value={policyNumber} />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Estado</label>
                        <Select
                            name="idStatus"
                            placeholder="Estado"
                            options={statusOpt}
                            value={idStatus}
                            onChange={(value) => { handleSelectChange('idStatus', value) }}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Marca</label>
                        <Select
                            placeholder="Marca"
                            name="brand"
                            value={brand}
                            options={brandOpt}
                            onChange={(obj) => {
                                handleLoadModels(obj)
                            }} />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Modelo</label>
                        <Select
                            placeholder="Modelo"
                            name="model"
                            value={model}
                            options={brandModelOpt}
                            onChange={(obj) => { handleSelectChange('model', obj) }} />
                    </div>

                    <div className="col-md-3">
                        <label className="control-label">Fecha ITV</label>
                        <input
                            className="form-control"
                            type="date"
                            placeholder="Fecha ITV"
                            name="ITVdate"
                            value={ITVdate}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Fecha de mantenimiento</label>
                        <input
                            className="form-control"
                            type="date"
                            placeholder="Fecha de mantenimiento"
                            name="maintenanceDate"
                            value={maintenanceDate}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Número de seguro</label>
                        <input
                            className="form-control"
                            placeholder="Número de seguro"
                            name="insuranceNumber"
                            onChange={handleInputChange}
                            value={insuranceNumber} />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Fecha caducidad seguro</label>
                        <input
                            className="form-control"
                            type="date"
                            placeholder="Fecha caducidad seguro"
                            name="insuranceDateLimit"
                            value={insuranceDateLimit}
                            onChange={handleInputChange} />
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

            <DocumentsRepeater />

        </>
    )
}
