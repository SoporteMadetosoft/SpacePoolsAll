import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { deconstructSelect } from '../../../utility/helpers/deconstructSelect'

export const Select = ({ name, label, className, placeholder = label, isMulti = false, labelName = 'name', endpoint }) => {

    const dispatch = useDispatch()
    const normalForm = useSelector(state => state.normalForm)
    const { [endpoint]: options } = useSelector(state => state.selectReducer)
    const value = normalForm[name] ? deconstructSelect(normalForm[name]) : null

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleChangeController(name, { id: value, name: label }))
    }

    useEffect(() => {
        dispatch(startAddSelectOptions(endpoint, endpoint, labelName))
    }, [])


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
