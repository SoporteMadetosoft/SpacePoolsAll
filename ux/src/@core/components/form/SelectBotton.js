import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeController } from '../../../redux/actions/normalForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/pro-light-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import RadioButton from '@material-ui/core/Radio'

export const SelectBotton = ({ name, label, className = '', containerClassname = 'mt-1', color = "primary", zone, position }) => {
    const dispatch = useDispatch()
    const { normalForm } = useSelector(state => state)
    const handleRadioChange = ({ target }) => { dispatch(handleChangeController(zone, normalForm[zone].map((repeater, index) => { return { ...repeater, [target.name]: index === position } }))) }
    let value = normalForm[zone][position][name]
    if (position === 0 && normalForm[zone].every(a => !a[name])) {
        value = true
        handleRadioChange({ target: { name } })
    }
    return (
        <div className={containerClassname} >
            { label && <label className="control-label d-flex justify-content-between ml-2">{label}</label> }
            <RadioButton
                type="radio"
                className={`${className} ml-2`}
                name={name}
                checkedIcon={<FontAwesomeIcon icon={faCheckCircle} />}
                icon={<FontAwesomeIcon icon={faCircle} />}
                color={color}
                checked={value}
                onChange={handleRadioChange}
            />
        </div>
    )
}