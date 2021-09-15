import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { useForm } from 'react-hook-form'

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
    const { register, formState: { errors } } = useForm()

    const value = normalForm[name] ? deconstructSelect(normalForm[name], labelName) : null

    const handleSelectChange = ({ value, label }) => {
        dispatch(handleChangeController(name, { id: value, [labelName]: label }))
    }

    return (
        <>
            <label className="control-label">{label}</label>
            <ReactSelect
                className={`${className}`}
                id={name}
                name={name}
                isMulti={isMulti}
                options={options}
                value={value}
                innerRef={register({ required: true })}
                invalid={errors[name] && true}
                styles={placeholderStyles}
                placeholder={placeholder}
                onChange={handleSelectChange}
            />
        </>
    )
}
