import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RadioButton from '@material-ui/core/Radio'
import { editRepeaterRegister, handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

import '@styles/react/libs/react-select/_react-select.scss'

export const SelectBotton = (props) => {

    const { name, label, className = '', endPoint, containerClassname = 'mt-1', color = "primary", zone, position} = props

    const dispatch = useDispatch()

    const { normalForm } = useSelector(state => state)

    useEffect(() => dispatch(startAddSelectOptions(endPoint, endPoint)), [])

    const value = !((normalForm[name] !== undefined && normalForm[name] !== null) || zone) ? false : zone ? normalForm[zone][position][name] : normalForm[name]
    return (
        
        <div className={containerClassname} >

            { label && <label className="control-label d-flex justify-content-between ml-2">{label}</label> }
            <RadioButton
                type="radio"
                className={`${className} ml-2`}
                name={name}
                color={color}
                checked={value}
                onChange={(event, checked) => dispatch(editRepeaterRegister(zone, position, checked))}
            />
        </div>
    )
}