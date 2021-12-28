import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

export const Select = ({ name, label, className, endpoint, placeholder = label, isMulti = false, labelName = 'name', errMsg = '', onSelect }) => {

    const dispatch = useDispatch()
    const { selectReducer, normalForm, formValidator } = useSelector(state => state)
    const { [endpoint]: options } = selectReducer

    let value
    let handleSelectChange

    if (isMulti) {
        value = normalForm[name] ? normalForm[name].map(element => ({ value: element.id, label: element[labelName] })) : null
        handleSelectChange = (value) => {

            if (formValidator.errors && formValidator.errors[name]) {
                delete formValidator.errors[name]
            }
            dispatch(removeError(formValidator.errors))
            const newValues = value.map(element => ({ id: element.value, [labelName]: element.label }))

            dispatch(handleChangeController(name, newValues))
        }
    } else {
        value = normalForm[name] ? { label: normalForm[name][labelName], value: normalForm[name].id } : null
        handleSelectChange = ({ value, label }) => {

            if (formValidator.errors && formValidator.errors[name]) {
                delete formValidator.errors[name]
            }
            dispatch(removeError(formValidator.errors))

            dispatch(handleChangeController(name, { id: value, [labelName]: label }))
        }
    }

    useEffect(() => {
        dispatch(startAddSelectOptions(endpoint, endpoint, labelName))
    }, [])

    return (
        <div>
            <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label>
            <ReactSelect
                isClearable={true}
                className={`${className} ${formValidator.errors && formValidator.errors[name] ? 'border-danger rounded' : ''}`}
                name={name}
                options={options}
                placeholder={placeholder}
                value={value}
                isMulti={isMulti}
                onChange={onSelect !== undefined ? onSelect : handleSelectChange}
            />
        </div>
    )
}