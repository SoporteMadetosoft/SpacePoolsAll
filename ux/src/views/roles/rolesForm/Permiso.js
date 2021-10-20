import React from 'react'
import { useDispatch } from 'react-redux'
import CustomInput from 'reactstrap/lib/CustomInput'

export const Permiso = ({ name, id }) => {

    const dispatch = useDispatch()

    const switchPermision = (valor) => {
        switch (valor) {
            case 1:
                return 'read'
            default:
        }
    }

    const handleChange = (e, id, num) => {
        if (e.target.checked) {

            console.log(e, id, num)
        }
    }

    return (
        <tr>
            <td>{name}</td>
            <td><CustomInput type='checkbox' onChange={(e) => handleChange(e, id, 1)} id={`${id}-1`} /></td>
            <td><CustomInput type='checkbox' onChange={(e) => handleChange(e, id, 2)} id={`${id}-2`} /></td>
            <td><CustomInput type='checkbox' onChange={(e) => handleChange(e, id, 3)} id={`${id}-3`} /></td>
            <td><CustomInput type='checkbox' onChange={(e) => handleChange(e, id, 4)} id={`${id}-4`} /></td>
            <td><CustomInput type='checkbox' onChange={(e) => handleChange(e, id, 5)} id={`${id}-5`} /></td>
        </tr>
    )
}
