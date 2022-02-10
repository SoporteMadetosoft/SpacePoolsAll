import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { selectThemeColors } from '@utils'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

import '@styles/react/libs/react-select/_react-select.scss'

export const MultiSelect = (props) => {

    const { name, label, className = '', endPoint, placeholder = label,
        labelName = 'name', errMsg = 'Campo requerido', isClearable = true, onSelect, containerStyle = {},
        styles = '', defecto = false, defaultOptions } = props

    const dispatch = useDispatch()
    const { selectReducer, normalForm, formValidator } = useSelector(state => state)
    let { [endPoint]: options } = selectReducer
    const isValueEmpty = normalForm[name] && Object.keys(normalForm[name]).length > 0
    options = defaultOptions ? defaultOptions : options

    const value = isValueEmpty ? normalForm[name].map(element => ({ value: element.id, label: element[labelName] })) : (defecto !== false && options !== undefined) && options[defecto]

    const handleSelectChange = (value) => {

        if (formValidator.errors && formValidator.errors[name]) {
            delete formValidator.errors[name]
        }
        dispatch(removeError(formValidator.errors))

        const selectedValue = value.map(element => ({ id: element.value, [labelName]: element.label }))

        dispatch(handleChangeController(name, selectedValue))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions(endPoint, endPoint, labelName))
    }, [])


    return (
        <div style={{ ...containerStyle }}>
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
                options={options}
                placeholder={placeholder}
                value={value}
                isMulti={true}
                onChange={onSelect ? onSelect : handleSelectChange}
            />
        </div>
    )
}