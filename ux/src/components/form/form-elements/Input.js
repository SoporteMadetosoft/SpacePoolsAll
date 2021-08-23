import React from 'react'
import { handleBaseFormChange, handleRepeaterFormChange } from '@redux/actions/form'
import { useDispatch } from 'react-redux'
export const Input = ({
    field_type,
    field_id,
    field_name,
    field_placeholder,
    field_value,
    field_className,
    field_label,
    block_className,
    type_of_form
}) => {

    const dispatch = useDispatch()
    const handleInputChange = (e) => {
        e.preventDefault()
        if (e.target.id.split('-').length === 3) {
            const [idGroup, camp, id] = e.target.id.split('-')
            dispatch(handleRepeaterFormChange(idGroup, parseInt(id), camp, e.target.value))
        } else {
            dispatch(handleBaseFormChange(e.target.id, e.target.value))
        }
    }

    return (

        <div  className={ `${block_className}  mt-1`}>
            <label>{field_label}</label>
            <input
                placeholder={field_placeholder}
                name={field_name}
                id={field_id}
                type={field_type}
                value={field_value}
                className={field_className}
                onChange={handleInputChange}
            />
        </div>
    )
}
