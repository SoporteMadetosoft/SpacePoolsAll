import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from 'reactstrap/lib/CustomInput'
import { Select } from '../../../components/form/inputs/Select'
import { SwitchPermission, SwitchPermissionAll } from '../../../redux/actions/permisos'

export const Permiso = ({ name, id, actions }) => {

    const dispatch = useDispatch()
    const permisos = useSelector(state => state.permisosReducer)

    let manage = false
    if (permisos[id]['read'] === true && permisos[id]['insert'] === true && permisos[id]['update'] === true && permisos[id]['delete'] === true) {
        manage = true
    }

    const handleChangeSinglePermission = (e, id, permiso) => {
        dispatch(SwitchPermission(id, permiso, e.target.checked))
    }

    const handleChangeAllPermission = (e, id) => {
        dispatch(SwitchPermissionAll(id, e.target.checked))
    }

    return (
        <tr>
            <td style={{ width: '2%' }}><CustomInput type='checkbox' checked={manage} onChange={(e) => handleChangeAllPermission(e, id)} id={`${id}-0`} /></td>
            <td>{name}</td>
            <td><CustomInput type='checkbox' checked={permisos[id]['read']} onChange={(e) => handleChangeSinglePermission(e, id, 'read')} id={`${id}-1`} /></td>
            <td><CustomInput type='checkbox' checked={permisos[id]['insert']} onChange={(e) => handleChangeSinglePermission(e, id, 'insert')} id={`${id}-2`} /></td>
            <td><CustomInput type='checkbox' checked={permisos[id]['update']} onChange={(e) => handleChangeSinglePermission(e, id, 'update')} id={`${id}-3`} /></td>
            <td><CustomInput type='checkbox' checked={permisos[id]['delete']} onChange={(e) => handleChangeSinglePermission(e, id, 'delete')} id={`${id}-4`} /></td>
            {actions ?
                (
                    <>
                        <td>
                            <CustomInput type='checkbox' checked={permisos[id]['actions']} onChange={(e) => handleChangeSinglePermission(e, id, 'actions')} id={`${id}-5`} />
                        </td>
                        {id === 'Production' ?
                            (
                                <td style={{ width: '20%' }}>
                                    <Select name="productionStatus" placeholder="Estado" endpoint="ProductionStatus" isMulti={true} />
                                </td>
                            )
                            : (<td></td>)
                        }

                    </>
                )
                : (<><td></td><td></td></>)
            }

        </tr>
    )
}
