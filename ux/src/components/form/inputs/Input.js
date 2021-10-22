import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'

export const Input = ({ name, label, className, placeholder = label, type = "text", readOnly }) => {

    const dispatch = useDispatch()
    const normalForm = useSelector(state => state.normalForm)
    const value = normalForm[name]

    const handleInputChange = ({ target }) => {
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <>
            <label className="control-label">{label}</label>
            <input
                className={`form-control ${className} ${formValidator.errors && formValidator.errors[name] ? 'borderless border-danger rounded' : ''}`}
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={handleInputChange}
                readOnly={readOnly}
            />
        </>
    )
}