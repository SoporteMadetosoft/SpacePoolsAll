import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

export const Input = ({ props }) => {

    const { name, label, className = '', placeholder = label, type = "text", styles, errMsg = '', readonly = false, value = '' } = props

    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)

    const valor = normalForm[name] ? normalForm[name] : value

    const handleInputChange = ({ target }) => {
        if (formValidator.errors && formValidator.errors[target.name]) {
            delete formValidator.errors[target.name]
        }
        dispatch(removeError(formValidator.errors))
        dispatch(handleChangeController(target.name, target.value))
    }

    return (
        <div>
            <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label>
            <input
                style={{ ...styles }}
                type={type}
                readonly={readonly && 'readonly'}
                className={`form-control ${className} ${formValidator.errors && formValidator.errors[name] ? 'borderless border-danger rounded' : ''}`}
                name={name}
                placeholder={placeholder}
                value={valor}
                onChange={handleInputChange}
                autoComplete="off"
            />
        </div>
    )
}