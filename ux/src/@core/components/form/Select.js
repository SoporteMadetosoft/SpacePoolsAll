import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { selectThemeColors } from '@utils'
import { editRepeaterRegister, handleChangeController } from '@redux/actions/normalForm'
import { startAddSelectOptions } from '@redux/actions/selects'
import { removeError } from '@redux/actions/formValidator'
import { InputValidator } from './InputValidator'
import { constructSelect } from '@utility/helpers/deconstructSelect'

export const Select = ({ name, label, className = '', endPoint, placeholder = label, labelName = 'name', errMsg = 'Campo requerido', isClearable = true, onSelect, containerStyle = {}, containerClassname = 'mt-1', styles = '', customOptions, defecto = null, zone, position, master = null }) => {
    const dispatch = useDispatch()
    const { normalForm, selectReducer, formValidator } = useSelector(state => state)
    const options = customOptions ? customOptions : selectReducer[endPoint]
    const handleSelectChange = (t) => {
        if (formValidator.errors && formValidator.errors[name]) delete formValidator.errors[name]
        dispatch(removeError(formValidator.errors))
        dispatch(handleChangeController(name, t ? t.value : null))
    }
    const findSelectedOpt = (v) => {
        const selectedOption = options?.find(o => o.value === v)
        if (selectedOption === undefined && (options && options?.length === 0)) handleSelectChange()
        return selectedOption
    }
    const handleSelectRepeaterChange = (key, element) => dispatch(editRepeaterRegister(zone, position, { name: key, value: constructSelect(element).id }))
    useEffect(() => dispatch(startAddSelectOptions(endPoint, endPoint, labelName, master?.onChange(normalForm[master?.name]))), [normalForm[master?.name]])
    return (
        <div className={containerClassname} style={{ ...containerStyle }}>
            { label && <label className="control-label d-flex justify-content-between">{label} {<InputValidator errMsg={errMsg} errors={formValidator.errors} target={name} />}</label> }
            <ReactSelect
                isClearable={isClearable}
                className={`${className} ${formValidator.errors && formValidator.errors[name] ? 'border-danger rounded' : ''}`}
                name={name}
                isDisabled={options?.length === 0 }
                classNamePrefix={'select'}
                theme={selectThemeColors}
                styles={styles}
                options={options}
                placeholder={placeholder}
                value={!((normalForm[name] !== undefined && normalForm[name] !== null) || zone) ? (defecto && options) && options[defecto]?.value : findSelectedOpt(zone ? normalForm[zone][position][name] : normalForm[name])}
                onChange={onSelect ? onSelect : zone ? ((value) => handleSelectRepeaterChange(name, value)) : handleSelectChange}
            />
        </div>
    )
}