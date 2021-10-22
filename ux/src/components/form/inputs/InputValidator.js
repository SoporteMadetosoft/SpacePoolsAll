import React from 'react'
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const InputValidator = ({errors, errMsg, target}) => {
  
    if (errors && errors[target]) {
        return (<small className="text-danger">{errMsg} <FontAwesomeIcon icon={faInfoCircle} /></small>)  
    }
    return <span/>
    
}