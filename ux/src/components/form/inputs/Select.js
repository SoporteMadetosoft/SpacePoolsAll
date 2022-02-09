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
        labelName = 'name', errMsg = '', isClearable = true, onSelect, containerStyle = {},
        styles = '', defecto = false, hasLabel = true, defaultOptions,
        zone, position } = props

    const dispatch = useDispatch()
    const { selectReducer, normalForm, formValidator } = useSelector(state => state)

    const { [endPoint]: options } = selectReducer
    const object = zone ? normalForm[zone][position][name] : normalForm[name]

    const isValueEmpty = object && Object.keys(object).length > 0
    const value = isValueEmpty ? { label: object[labelName], value: object.id } : (defecto !== false && options !== undefined) && options[defecto]

    const handleSelectChange = ({ value, label }) => {
        if (formValidator.errors && formValidator.errors[name]) delete formValidator.errors[name]
        dispatch(removeError(formValidator.errors))
        dispatch(handleChangeController(name, { id: value, [labelName]: label }))
    }

    const handleSelectRepeaterChange = (key, element) => {
        const el = constructSelect(element)
        const obj = { name: key, value: el }
        dispatch(editRepeaterRegister(zone, position, obj))
    }

    useEffect(() => dispatch(startAddSelectOptions(endPoint, endPoint, labelName)), [])

    return (
        <div style={{ ...containerStyle }}>
            {
                hasLabel &&
                <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label>
            }
            <ReactSelect
                isClearable={isClearable}
                className={`${className} ${formValidator.errors && formValidator.errors[name] ? 'border-danger rounded' : ''}`}
                name={name}
                classNamePrefix={'select'}
                theme={selectThemeColors}
                styles={styles}
                options={defaultOptions ? defaultOptions : options}
                placeholder={placeholder}
                value={value}
                onChange={onSelect !== undefined
                    ? onSelect :
                    zone ? ((value) => {
                        handleSelectRepeaterChange(name, value)
                    }) : handleSelectChange}
            />
        </div>
    )
}