import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'

export const Input = ({ name, label, className, placeholder = label, type = "text" }) => {

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
                type={type}
                className={`form-control ${className}`}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
            />
        </>
    )
}
