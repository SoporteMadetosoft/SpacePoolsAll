import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

export const Input = ({ name, label, className, placeholder = label, type = "text", styles, errMsg = '' }) => {

    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)

    const value = normalForm[name] ? normalForm[name] : ''

    const handleInputChange = ({ target }) => {
        if (formValidator.errors && formValidator.errors[target.name]) {
            delete formValidator.errors[target.name]
        }
        dispatch(removeError(formValidator.errors))
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <div style={{marginTop: '5px'}}>
            <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label>
            <input
                style={{...styles}}
                type={type}
                className={`form-control ${className} ${formValidator.errors && formValidator.errors[name] ? 'borderless border-danger rounded' : ''}`}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                autoComplete="off"
            />
        </div>
    )
}