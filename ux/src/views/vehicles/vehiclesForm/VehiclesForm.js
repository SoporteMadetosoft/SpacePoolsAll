import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { handleChangeController, handleStartEditing } from '../../../redux/actions/normalForm'
import { startAddSelectOptions, addSelectOptions } from '../../../redux/actions/selects'
import '../styles/form.css'
import { DocumentsRepeater } from './DocumentsRepeater'

export const VechiclesForm = ({ id }) => {
    
    const dispatch = useDispatch()
        
    const { normalForm, selectReducer } = useSelector(state => state)
    const { 
        plateNumber,
        frameNumber,
        tara,
        MMA,
        itvDate,
        brand,
        idVehicleBrandModel,
        policyNumber,
        carrierId,
        trailerId,
        observations,
        maintenanceDate,
        insuranceDateLimit,
        tachograph } = normalForm
    
    const opts = selectReducer

    useEffect( () => {
        if (id) {
            dispatch(handleStartEditing('Vehicles', id))
        }
        dispatch(startAddSelectOptions('/setup/vehicles/type', 'vehiclesType'))
        dispatch(startAddSelectOptions('/setup/containers/type', 'containersType'))
        dispatch(startAddSelectOptions('/setup/vehicles/brand', 'brand'))
        dispatch(startAddSelectOptions('/setup/vehicles/hookType', 'hooksType'))
        dispatch(startAddSelectOptions('/setup/vehicles/warehouse', 'warehouse'))
        dispatch(startAddSelectOptions('/setup/general/garbage/type', 'garbageType'))

    }, [])

    const handleLoadModels = async (obj) => {
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URI}/setup/vehicles/brand/model/select/${obj.value}`)
        dispatch(addSelectOptions('idVehicleBrandModel', data.data))
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
                        <label className="control-label">Matrícula</label>
                        <input 
                            className="form-control" 
                            placeholder="Matrícula" 
                            name="plateNumber"
                            onChange={ handleInputChange } 
                            value={ plateNumber }/>
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Número de bastidor</label>
                        <input 
                            className="form-control" 
                            placeholder="Número de bastidor" 
                            name="frameNumber"
                            onChange={handleInputChange}
                            value={frameNumber} />
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
                        <label className="control-label">Transportista</label>
                        <Select 
                            placeholder="Transportista" 
                            name="carrierId " 
                            defaultValue={carrierId }
                            options={opts.carriers }
                            onChange={ (obj) => { handleSelectChange('carrierId ', obj) }} />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Tara</label>
                        <input 
                            className="form-control" 
                            placeholder="Tara" 
                            name="tara"
                            value={ tara }
                            onChange={ handleInputChange } />
                    </div>
                    <div className="col-md-2 ">
                        <label className="control-label">M.M.A.</label>
                        <input 
                            className="form-control" 
                            placeholder="M.M.A." 
                            name="MMA"
                            value={ MMA }
                            onChange={ handleInputChange } />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Tacografo del camion</label>
                        <input 
                            className="form-control" 
                            placeholder="Tacografo" 
                            name="tachograph"
                            value={ tachograph }
                            onChange={ handleInputChange } />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Marca</label>
                        <Select 
                            placeholder="Marca" 
                            name="brand"
                            defaultValue={brand}
                            options={opts.brand}
                            onChange={ (obj) => { 
                                handleLoadModels(obj)
                            }} />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Modelo</label>
                        <Select 
                            placeholder="Modelo" 
                            name="idVehicleBrandModel" 
                            defaultValue={idVehicleBrandModel}
                            options={opts.idVehicleBrandModel}
                            onChange={ (obj) => { handleSelectChange('idVehicleBrandModel', obj) }} />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Remolque</label>
                        <Select 
                            placeholder="Remolque" 
                            name="trailerId  " 
                            defaultValue={ trailerId  }
                            options={opts.trailers }
                            onChange={ (obj) => { handleSelectChange('trailerId  ', obj) }} />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Fecha ITV</label>
                        <input 
                            className="form-control" 
                            type="date" 
                            placeholder="Fecha ITV" 
                            name="itvDate"
                            value={ itvDate }
                            onChange={ handleInputChange } />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Fecha de mantenimiento</label>
                        <input 
                            className="form-control" 
                            type="date" 
                            placeholder="Fecha de mantenimiento" 
                            name="maintenanceDate"
                            value={ maintenanceDate }
                            onChange={ handleInputChange } />
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">Fecha caducidad seguro</label>
                        <input 
                            className="form-control" 
                            type="date" 
                            placeholder="Fecha caducidad seguro" 
                            name="insuranceDateLimit"
                            value={ insuranceDateLimit }
                            onChange={ handleInputChange } />
                    </div>
                    <div className="col-md-12">
                        <label className="control-label">Observaciones</label>
                        <textarea 
                            className="form-control" 
                            placeholder="Observaciones" 
                            name="observations"
                            defaultValue={ observations }
                            onChange={ handleInputChange }
                        ></textarea>
                    </div>
                </div>
            </div>
            
            <DocumentsRepeater />
                
        </>
    )
}
