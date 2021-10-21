import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'

const placeholderStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            FontSize: '5px'
        }
    }
}

export const Select = ({ name, label, className, placeholder = label, isMulti = false, labelName = 'name', endpoint }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startAddSelectOptions(endpoint, endpoint, labelName))
    }, [])

    const normalForm = useSelector(state => state.normalForm)
    const { [endpoint]: options } = useSelector(state => state.selectReducer)

    let value

    let handleSelectChange
    if (isMulti) {
        value = normalForm[name] ? normalForm[name].map(element => ({ value: element.id, label: element[labelName] })) : null
        handleSelectChange = (value) => {
            const newValues = value.map(element => ({ id: element.value, name: element.label }))
            dispatch(handleChangeController(name, newValues))
        }
    } else {
        value = normalForm[name] ? { label: normalForm[name][labelName], value: normalForm[name].id } : null
        handleSelectChange = ({ value, label }) => {
            dispatch(handleChangeController(name, { id: value, [labelName]: label }))
        }
    }

    return (
        <>
            {label ? (<label className="control-label">{label}</label>) : ('')}

            <ReactSelect
                className={`${className}`}
                id={name}
                name={name}
                isMulti={isMulti}
                options={options}
                value={value}
                styles={placeholderStyles}
                placeholder={placeholder}
                onChange={handleSelectChange}
            />
        </>
    )
}
