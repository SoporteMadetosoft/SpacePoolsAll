import React, { useState } from 'react'
import RadioButton from '@material-ui/core/Radio'
import { useDispatch } from 'react-redux'

import { handleRepeaterFormChange } from '../../../redux/actions/form'

export const Radio = ({
    field_id,
    field_label,
    field_active_icon,  
    field_icon, 
    field_value = false,
    field_radio_group,
    block_className,
    field_name
}) => {

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        e.preventDefault()
        
        const [idGroup, camp, id] = e.target.id.split('-')
        
        if (e.target.checked) {
             document.querySelectorAll(`input[name="${field_radio_group}"]`).forEach(item => { 
                const [, , itemId] = item.id.split('-')
                if (itemId !== id) {
                    
                    item.checked = false 
                    
                    dispatch( handleRepeaterFormChange(idGroup, parseInt(itemId), camp, 0) )
                }
                
            })
        }
        e.target.checked = true
        dispatch( handleRepeaterFormChange(idGroup, parseInt(id), camp, 1) )
        
    }


    return (
        <div  className={ `${block_className}  mt-1`}>
            <label>{field_label}</label>
            <RadioButton 
                id={field_id}
                checked={field_value}  
                name={field_radio_group}
                onChange={handleInputChange}
                color="primary"
            />
       
        </div> 
    )
}
