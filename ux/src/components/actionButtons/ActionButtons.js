import { Button } from 'reactstrap'
import React from 'react'
import './actionButtons.css'

import { useHistory } from "react-router-dom"

export const ActionButtons = () => {
    const history = useHistory()

    return (
        <div id="actionButtons">
            <Button.Ripple className="float-save" color='primary' type='submit'>
                <span className='align-middle ml-25'>Guardar</span>
            </Button.Ripple>
            <Button.Ripple className="float-back" color='secondary' outline style={{ marginRight: '10px' }} onClick={() => { history.goBack() }}>
                <span className='align-middle ml-25'>Cancelar</span>
            </Button.Ripple>
        </div>
    )
}

