import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { handleBaseFormChange, handleRepeaterFormChange } from '@redux/actions/form'
import { types } from './types'


export const Select = ({
    field_id,
    field_name,
    field_label,
    field_className,
    field_placeholder,
    field_value,
    field_options,
    block_className
}) => {
   
    const dispatch = useDispatch()
    const handleSelectValue = (e) => {
        Select.field_value = e
        if (field_id.split('-').length === 3) {
            const [ idGroup, camp, id ] = field_id.split('-')
            dispatch( handleRepeaterFormChange(idGroup, parseInt(id), camp, e ) )
        } else {
            dispatch(handleBaseFormChange(field_id, e))
        }
    }

    // const options = () => {
    //     if (typeof field_options === 'object') {
    //         return field_options
    //     } else {
    //         const {[types[field_options]]: result} = useSelector(state => state[field_options])
    //         return result
    //     }
    // }

    
    return (
        <div  className={ `${block_className}  mt-1`}>
            <label>{field_label}</label>
            <ReactSelect
                id={field_id}
                name={field_name}
                className={field_className}
                placeholder={field_placeholder}
                // options={options()}
                value={field_value}
                onChange={handleSelectValue}
            />
        </div>

    )
}
