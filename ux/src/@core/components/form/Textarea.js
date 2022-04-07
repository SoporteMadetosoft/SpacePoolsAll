import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

export const Textarea = ({ name, label, className, placeholder = label, styles, errMsg = '', readOnly = false, disabled }) => {
    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)
    const handleInputChange = ({ target }) => {
        if (formValidator.errors && formValidator.errors[target.name]) delete formValidator.errors[target.name]
        dispatch(removeError(formValidator.errors))
        dispatch(handleChangeController(target.name, target.value))
    }
    return (
        <div className='mt-2'>
            <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label>
            <textarea
                style={{ ...styles }}
                disabled={disabled}
                readOnly={readOnly && 'readOnly'}
                className={`form-control ${className} ${formValidator.errors && formValidator.errors[name] ? 'borderless border-danger rounded' : ''}`}
                name={name}
                placeholder={placeholder}
                value={normalForm[name] ? normalForm[name] : ''}
                onChange={handleInputChange}
                autoComplete="off"
            />
        </div>
    )
}