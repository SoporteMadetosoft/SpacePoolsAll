import React from 'react'
import { useDispatch } from 'react-redux'
import { handleBaseFormChange } from '@redux/actions/form'


export const TextArea = ({
    field_label,
    field_id,
    field_name,
    field_placeholder,
    field_value,
    field_className,
    block_className
}) => {
    const dispatch = useDispatch()
    const handleInputChange = (e) => {
        e.preventDefault()
        dispatch(handleBaseFormChange(e.target.id, e.target.value))
    }

    
    return (
        <div  className={ `${block_className} mt-1` }>
            <label>{field_label}</label>
            <textarea 
                id={ field_id } 
                name={ field_name } 
                placeholder={ field_placeholder }
                className={ field_className }
                defaultValue={field_value}
                onChange={handleInputChange}
            ></textarea>
        </div>
        
    )
}
