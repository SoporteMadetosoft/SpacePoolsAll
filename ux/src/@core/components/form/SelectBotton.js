import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RadioButton from '@material-ui/core/Radio'
import { editRepeaterRegister, handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

import '@styles/react/libs/react-select/_react-select.scss'

export const SelectBotton = (props) => {

    const { name, label, className = '', containerClassname = 'mt-1', color = "primary", zone, position} = props

    const dispatch = useDispatch()

    const { normalForm } = useSelector(state => state)

    const value = normalForm[zone][position][name]
    
    const handleRadioChange = ({ target }) => {
        const newRepeaterList = normalForm[zone].map((repeater, index) => {
            return { ...repeater, [target.name]: index === position }
        })
        dispatch(handleChangeController(zone, newRepeaterList))
    }

    return (
        
        <div className={containerClassname} >

            { label && <label className="control-label d-flex justify-content-between ml-2">{label}</label> }
            <RadioButton
                type="radio"
                className={`${className} ml-2`}
                name={name}
                color={color}
                checked={value}
                onChange={handleRadioChange}
            />
        </div>
    )
}