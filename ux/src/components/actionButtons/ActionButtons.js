import { Button } from 'reactstrap'
import React from 'react'
import './actionButtons.css'
import { ArrowLeft, Save } from 'react-feather'
import { useHistory } from "react-router-dom"

export const ActionButtons = () => {
    const history = useHistory()

    return (
        <div id="actionButtons">
            <Button.Ripple className='float-back-button' color='danger' onClick={() => { history.goBack() }}>
                <ArrowLeft size={15} />
            </Button.Ripple>

            <Button.Ripple className='float-save-button' color='primary' type='submit'>
                <Save size={35} />
            </Button.Ripple>

        </div>
    )
}
