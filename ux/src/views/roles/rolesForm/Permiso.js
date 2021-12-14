import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from 'reactstrap/lib/CustomInput'
import { Select } from '../../../components/form/inputs/Select'
import { SwitchPermission, SwitchPermissionAll } from '../../../redux/actions/permisos'

const diccionario = {
    Customers: 'Clientes',
    Vendors: 'Proveedores',
    Carriers: 'Transportistas',
    Vehicles: 'Vehículos',
    Trailers: 'Remolques',
    Pools: 'Piscinas',
    Items: 'Artículos',
    ItemColors: 'Artículos con color',
    Family: 'Familias',
    Purchases: 'Compras',
    Orders: 'Pedidos',
    Delivery: 'Gestor de entregas',
    Production: 'Producción',
    Calendar: 'Calendario',
    Users: 'Usuarios',
    Roles: 'Roles',
    PaymentMethods: 'Métodos de pago',
    Departments: 'Departamentos',
    AddressesTypes: 'Tipos de diección',
    Taxes: 'Impuestos',
    CustomerType: 'Tipos de cliente',
    CustomerCategory: 'Categorias de cliente',
    Activity: 'Actividades',
    Origin: 'Origenes',
    VendorType: 'Tipos de vendedor',
    Brand: 'Marcas',
    Model: 'Modelos',
    Place: 'Ubicaciones',
    Colors: 'Colores',
    Alerts: 'Alertas',
    Logs: 'Logs'
}

export const Permiso = ({ id, add, edit, del, actions }) => {

    const dispatch = useDispatch()
    const permisos = useSelector(state => state.permisosReducer)

    let manage = false
    let perm = 0

    const manageadd = add ? 1 : 0
    const manageedit = edit ? 1 : 0
    const managedel = del ? 1 : 0
    const manageactions = actions ? 1 : 0

    const total = 1 + manageadd + manageedit + managedel + manageactions

    if (permisos[id]['read'] === true) {
        perm += 1
    }
    if (permisos[id]['insert'] === true) {
        perm += 1
    }
    if (permisos[id]['update'] === true) {
        perm += 1
    }
    if (permisos[id]['delete'] === true) {
        perm += 1
    }
    if (permisos[id]['actions'] === true) {
        perm += 1
    }

    if (perm === total) {
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
            <td>{diccionario[id]}</td>
            <td>
                <CustomInput type='checkbox' checked={permisos[id]['read']} onChange={(e) => handleChangeSinglePermission(e, id, 'read')} id={`${id}-1`} />
            </td>
            <td>
                {add !== undefined &&
                    (
                        <CustomInput type='checkbox' checked={permisos[id]['insert']} onChange={(e) => handleChangeSinglePermission(e, id, 'insert')} id={`${id}-2`} />
                    )
                }
            </td>
            <td>
                {edit !== undefined &&
                    (
                        <CustomInput type='checkbox' checked={permisos[id]['update']} onChange={(e) => handleChangeSinglePermission(e, id, 'update')} id={`${id}-3`} />
                    )
                }
            </td>
            <td>
                {del !== undefined &&
                    (
                        <CustomInput type='checkbox' checked={permisos[id]['delete']} onChange={(e) => handleChangeSinglePermission(e, id, 'delete')} id={`${id}-4`} />
                    )
                }
            </td>

            {actions !== undefined ?
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
