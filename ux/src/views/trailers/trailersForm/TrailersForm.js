import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { handleChangeController, handleStartEditing } from '../../../redux/actions/normalForm'
import { startAddSelectOptions, addSelectOptions } from '../../../redux/actions/selects'
import { DocumentsRepeater } from './DocumentsRepeater'


export const TrailersForm = ({ id }) => {
    
    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const { 
        plate,
        model,
        trailerCode,
        itvDate,
        policyNumber,
        insuranceNumber,
        insuranceDateLimit,
        maintenanceDate,
        observations,
        status,
        brand} = normalForm
    
    const opts = selectReducer

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
                        <label className="control-label">Matrícula del remolque</label>
                        <input 
                            className="form-control" 
                            placeholder="Matrícula" 
                            name="plate"
                            onChange={ handleInputChange } 
                            value={ plate }/>
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
                    <div className="col-md-3">
                        <label className="control-label">Modelo</label>
                        <Select 
                            placeholder="Modelo" 
                            name="model" 
                            defaultValue={model}
                            options={opts.idVehicleBrandModel}
                            onChange={ (obj) => { handleSelectChange('model', obj) }} />
                    </div>
                    
                    <div className="col-md-3">
                        <label className="control-label">Fecha ITV</label>
                        <input 
                            className="form-control" 
                            type="date" 
                            placeholder="Fecha ITV" 
                            name="itvDate"
                            value={ itvDate }
                            onChange={ handleInputChange } />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Fecha de mantenimiento</label>
                        <input 
                            className="form-control" 
                            type="date" 
                            placeholder="Fecha de mantenimiento" 
                            name="maintenanceDate"
                            value={ maintenanceDate }
                            onChange={ handleInputChange } />
                    </div>
                    <div className="col-md-3">
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
