import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'

import { handleChangeController } from '../../../redux/actions/normalForm'

export const Select = ({ name, label, className, options, placeholder = label, isMulti = false, labelName = 'name' }) => {

    const dispatch = useDispatch()
    const normalForm = useSelector(state => state.normalForm)
    const value = normalForm[name] ? { label: normalForm[name][labelName], value: normalForm[name].id } : null

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleChangeController(name, { id: value, name: label }))
    }

    return (
        <>
            <label className="control-label">{label}</label>
            <ReactSelect
                className={`${className}`}
                name={name}
                options={options}
                placeholder={placeholder}
                value={value}
                isMulti={isMulti}
                onChange={handleSelectChange}
            />
        </>
    )
}
