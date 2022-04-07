import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from '@material-ui/core'
import { handleChangeController } from '../../../redux/actions/normalForm'

export const Toggle = ({ name, label, className = '', containerClassname = 'mt-1', color = "primary", zone, position }) => {
    const dispatch = useDispatch()
    const { normalForm } = useSelector(state => state)
    return (
        <div className={containerClassname} >
            { label && <label className="control-label d-flex justify-content-between ml-2">{label}</label> }
            <Switch
                className={`${className} ml-2`}
                name={name}
                color={color}
                checked={!((normalForm[name] !== undefined && normalForm[name] !== null) || zone) ? false : zone ? normalForm[zone][position][name] : normalForm[name]}
                onChange={(event, checked) => dispatch(handleChangeController(name, checked))}
            />
        </div>
    )
}