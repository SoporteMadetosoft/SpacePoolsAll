import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export const InputValidator = ({ errors, errMsg, target }) => {
    return errors && errors[target] ? <small className="text-danger">{errMsg} <FontAwesomeIcon icon={faInfoCircle} /></small> : <span />
}