import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'

import { editRepeaterRegister, handleChangeController } from '../../../redux/actions/normalForm'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

export const Input = (props) => {

    const { name, label, className = '', placeholder = label, containerClassname = 'mt-1',
        type = "text", styles, errMsg = 'Campo requerido', readOnly = false, disabled = false,
        symbol = false, defecto = "", position, zone } = props

    const dispatch = useDispatch()
    const { normalForm, formValidator } = useSelector(state => state)

    const valor = zone ? normalForm[zone][position][name] : normalForm[name] ? normalForm[name] : defecto

    const handleInputChange = ({ target }) => {
        if (formValidator.errors && formValidator.errors[target.name]) delete formValidator.errors[target.name]
        dispatch(removeError(formValidator.errors))
        dispatch(handleChangeController(target.name, target.value))
    }

    const handleInputRepeaterChange = ({ target }) => {
        const obj = { name: target.name, value: target.value }
        dispatch(editRepeaterRegister(zone, position, obj))
    }
    return (
        <div className={containerClassname} >
            {
                label &&
                <label className="control-label d-flex justify-content-between ">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label>
            }
            <InputGroup>
                <input
                    style={{ ...styles }}
                    type={type}
                    disabled={disabled}
                    readOnly={readOnly && 'readOnly'}
                    className={`form-control ${className} ${formValidator.errors && formValidator.errors[name] ? 'borderless border-danger rounded' : ''}`}
                    name={name}
                    placeholder={placeholder}
                    value={valor}
                    onChange={zone ? handleInputRepeaterChange : handleInputChange}
                    autoComplete="off"
                />
                {
                    symbol && (
                        <InputGroupAddon addonType='append'>
                            <InputGroupText>{symbol}</InputGroupText>
                        </InputGroupAddon>
                    )
                }
            </InputGroup>
        </div>
    )
}