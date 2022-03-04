import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { selectThemeColors } from '@utils'

import { editRepeaterRegister, handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

import '@styles/react/libs/react-select/_react-select.scss'
import { constructSelect } from '../../../utility/helpers/deconstructSelect'

export const Select = (props) => {

    const { name, label, className = '', endPoint, placeholder = label,
        labelName = 'name', errMsg = 'Campo requerido', isClearable = true, onSelect, containerStyle = {},
        containerClassname = 'mt-2',
        styles = '', customOptions,
        defecto = null,
        zone, position } = props

    const dispatch = useDispatch()
    const { normalForm, selectReducer, formValidator } = useSelector(state => state)

    const { [endPoint]: options } = selectReducer

    const findSelectedOpt = (values) => {
        return customOptions ? customOptions?.find(o => o.value === values) : options?.find(o => o.value === values)
    }

    const value =
        (!((normalForm[name] !== undefined && normalForm[name] !== null) || zone)) ? ((defecto && options) && options[defecto].value)
            : zone ? findSelectedOpt(normalForm[zone][position][name])
                : findSelectedOpt(normalForm[name])

    const handleSelectChange = (target) => {
        if (formValidator.errors && formValidator.errors[name]) delete formValidator.errors[name]
        dispatch(removeError(formValidator.errors))
        dispatch(handleChangeController(name, target ? target.value : null))
    }

    const handleSelectRepeaterChange = (key, element) => {
        const el = constructSelect(element)
        const obj = { name: key, value: el.id }
        dispatch(editRepeaterRegister(zone, position, obj))
    }
    useEffect(() => dispatch(startAddSelectOptions(endPoint, endPoint, labelName)), [])

    return (
        <div className={containerClassname} style={{ ...containerStyle }}>
            {
                label &&
                <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label>
            }
            <ReactSelect
                isClearable={isClearable}
                className={`${className} ${formValidator.errors && formValidator.errors[name] ? 'border-danger rounded' : ''}`}
                name={name}
                classNamePrefix={'select'}
                theme={selectThemeColors}
                styles={styles}
                options={customOptions ? customOptions : options}
                placeholder={placeholder}
                value={value}
                onChange={onSelect ? onSelect
                    : zone ? ((value) => handleSelectRepeaterChange(name, value))
                        : handleSelectChange}
            />
        </div>
    )
}