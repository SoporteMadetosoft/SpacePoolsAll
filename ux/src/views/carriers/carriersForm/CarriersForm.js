import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { DocForm } from './DocForm'


export const CarriersForm = (id) => {

    const dispatch = useDispatch()
    const { normalForm, selectReducer } = useSelector(state => state)
    const {
        country,
        province,
        postcode,
        city,
        address,
        email,
        name,
        NIF,
        phone1,
        phone2,
        status} = normalForm

    const { statusOpt } = selectReducer

    useEffect( () => {
        dispatch(startAddSelectOptions('/Customers', 'customersOpt'))
        dispatch(startAddSelectOptions('/Vendors', 'vendorsOpt'))
        dispatch(startAddSelectOptions('/setup/general/status', 'statusOpt'))
    }, [])

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleSelectChange = (key, value) => {
        dispatch(handleChangeController(key, value))
    }

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-3">
                        <label className="control-label">Nombre</label>
                        <input
                            className="form-control"
                            name="name"
                            placeholder="Nombre"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">País</label>
                        <input
                            className="form-control"
                            name="country"
                            placeholder="País"
                            value={country}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">N.I.F.</label>
                        <input
                            className="form-control"
                            name="NIF"
                            placeholder="N.I.F."
                            value={NIF}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Provincia</label>
                        <input
                            className="form-control"
                            type="text"
                            name="province"
                            placeholder="Provincia"
                            value={province}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Código postal</label>
                        <input
                            className="form-control"
                            type="text"
                            name="postcode"
                            placeholder="Código postal"
                            value={postcode}
                            onChange={handleInputChange}
                        />
                    </div> 
                    <div className="col-md-3">
                        <label className="control-label">Ciudad</label>
                        <input
                            className="form-control"
                            type="text"
                            name="city"
                            placeholder="Ciudad"
                            value={city}
                            onChange={handleInputChange}
                        />
                    </div> 
                    <div className="col-md-3">
                        <label className="control-label">Dirección</label>
                        <input
                            className="form-control"
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            value={address}
                            onChange={handleInputChange}
                        />
                    </div> 
                    <div className="col-md-3">
                        <label className="control-label">Correo electrónico</label>
                        <input
                            className="form-control"
                            name="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Teléfono 1</label>
                        <input
                            className="form-control"
                            name="phone"
                            placeholder="Teléfono"
                            value={phone1}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Teléfono 2</label>
                        <input
                            className="form-control"
                            name="phone2"
                            placeholder="Teléfono"
                            value={phone2}
                            onChange={handleInputChange}
                        />
                    </div>  
                    <div className="col-md-3">
                        <label className="control-label">Estado</label>
                        <Select
                            name="status"
                            placeholder="Estado"
                            options={ statusOpt }
                            defaultValue={status}
                            onChange={ (value) => { handleSelectChange('status', value) }}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="control-label">Horario de contacto</label>
                        <input
                            className="form-control"
                            type="time"
                            name="contactSchedule"
                            // value={pickupTime}
                        />
                    </div>                
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <DocForm />
                </div>
            </div>
        </>
    )
}
