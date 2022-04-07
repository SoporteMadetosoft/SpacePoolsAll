import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectThemeColors } from '@utils'
import { handleChangeController } from '@redux/actions/normalForm'
import { startAddSelectOptions } from '@redux/actions/selects'
import { removeError } from '@redux/actions/formValidator'
import { InputValidator } from './InputValidator'
import ReactSelect from 'react-select'

export const MultiSelect = ({ name, label, className = '', endPoint, placeholder = label, labelName = 'name', errMsg = 'Campo requerido', isClearable = true, onSelect, containerStyle = {}, containerClassname = 'mt-1', styles = '', customOptions, zone , position }) => {
    const dispatch = useDispatch()
    const { selectReducer, formValidator } = useSelector(state => state)
    const handleSelectChange = (value) => {
        if (formValidator.errors && formValidator.errors[name]) delete formValidator.errors[name]
        dispatch(removeError(formValidator.errors))
        dispatch(handleChangeController(name, value.map(element => (element.value))))
    }
    useEffect(() => dispatch(startAddSelectOptions(endPoint, endPoint, labelName)), [])
    return (
        <div className={containerClassname} style={{ ...containerStyle }}>
            { label && <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label> }
            <ReactSelect
                isClearable={isClearable}
                className={`${className} ${formValidator.errors && formValidator.errors[name] ? 'border-danger rounded' : ''}`}
                name={name}
                classNamePrefix={'select'}
                theme={selectThemeColors}
                styles={styles}
                options={customOptions ? customOptions : selectReducer[endPoint]}
                placeholder={placeholder}
                isMulti={true}
                onChange={onSelect ? onSelect : zone ? ((value) => { dispatch(editRepeaterRegister(zone, position, { name, value: constructSelect(value).id })) }) : handleSelectChange }
            />
        </div>
    )
}