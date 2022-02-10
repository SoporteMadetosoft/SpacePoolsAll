import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export const InputValidator = ({ errors, errMsg, target }) => {
    if (errors && errors[target]) {
        return (<small className="text-danger">{errMsg} <FontAwesomeIcon icon={faInfoCircle} /></small>)
    }
    return <span />

}