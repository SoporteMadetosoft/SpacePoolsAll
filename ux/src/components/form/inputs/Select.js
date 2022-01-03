import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { selectThemeColors } from '@utils'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

import '@styles/react/libs/react-select/_react-select.scss'

export const Select = ({ name, label, className, endpoint, placeholder = label, isMulti = false, labelName = 'name', errMsg = '', isClearable = true, onSelect, styles = '', defecto = false }) => {

    const dispatch = useDispatch()
    const { selectReducer, normalForm, formValidator } = useSelector(state => state)
    const { [endpoint]: options } = selectReducer
    const isValueEmpty = normalForm[name] && Object.keys(normalForm[name]).length > 0

    let value
    let handleSelectChange

    if (isMulti) {
        value = isValueEmpty ? normalForm[name].map(element => ({ value: element.id, label: element[labelName] })) : (defecto !== false && options !== undefined) && options[defecto]
        handleSelectChange = (value) => {

            if (formValidator.errors && formValidator.errors[name]) {
                delete formValidator.errors[name]
            }
            dispatch(removeError(formValidator.errors))
            const newValues = value.map(element => ({ id: element.value, [labelName]: element.label }))

            dispatch(handleChangeController(name, newValues))
        }
    } else {
        value = isValueEmpty ? { label: normalForm[name][labelName], value: normalForm[name].id } : (defecto !== false && options !== undefined) && options[defecto]
        handleSelectChange = (value) => {

            if (formValidator.errors && formValidator.errors[name]) {
                delete formValidator.errors[name]
            }
            dispatch(removeError(formValidator.errors))
            const selectValue = value ? { id: value.value, [labelName]: value.label } : null

            dispatch(handleChangeController(name, selectValue))
        }
    }

    useEffect(() => {
        dispatch(startAddSelectOptions(endpoint, endpoint, labelName))
    }, [])


    return (
        <div>
            <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label>
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
                isMulti={isMulti}
                onChange={onSelect !== undefined ? onSelect : handleSelectChange}
            />
        </div>
    )
}