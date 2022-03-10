import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from '@material-ui/core'

import { handleChangeController } from '../../../redux/actions/normalForm'
import { startAddSelectOptions } from '../../../redux/actions/selects'
import { removeError } from '../../../redux/actions/formValidator'
import { InputValidator } from './InputValidator'

import '@styles/react/libs/react-select/_react-select.scss'

export const Toggle = (props) => {

    const { name, label, className = '', endPoint, containerClassname = 'mt-2', color = "primary"} = props

    const dispatch = useDispatch()

    const { normalForm } = useSelector(state => state)

    useEffect(() => dispatch(startAddSelectOptions(endPoint, endPoint)), [])

    return (
        <div className={containerClassname} >
            { label && <label className="control-label d-flex justify-content-between ml-2">{label}</label> }
            <Switch
                className={`${className} ml-2`}
                name={name}
                color={color}
                checked={normalForm[name] ? normalForm[name] : false}
                onChange={(event, checked) => dispatch(handleChangeController(name, checked))}
            />
        </div>
    )
}