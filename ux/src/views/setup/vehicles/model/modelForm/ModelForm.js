import Select from 'react-select'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleChangeController, handleStartEditing } from '../../../../../redux/actions/normalForm'

export const ModelForm = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { normalForm, selectReducer } = useSelector(state => state)
    const { name, idBrand } = normalForm
    const { brandOpt } = selectReducer

    useEffect(() => {
        if (id) {
            dispatch(handleStartEditing('Model', id))
        }
    }, [])

    const handleSelectChange = (key, value) => {
        dispatch(handleChangeController(key, value))
    }

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-4">
                        <label className="control-label">Modelo</label>
                        <input
                            className="form-control"
                            name="name"
                            placeholder="Modelo"
                            value={name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="control-label">Marca</label>
                        <Select
                            name="idBrand"
                            options={ brandOpt }
                            value={idBrand}
                            onChange={ (value) => { handleSelectChange('idBrand', value) }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
