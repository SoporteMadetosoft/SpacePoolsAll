import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { save } from '../../../utility/helpers/Axios/save'
import { Form } from 'reactstrap'
import { Input } from '../../../components/form/inputs/Input'
import Col from 'reactstrap/lib/Col'
import { Lock } from 'react-feather'
import Table from 'reactstrap/lib/Table'
import { Permiso } from './Permiso'

import { undoMultiSelect } from '../../../utility/helpers/undoMultiSelect'


export const RolesForm = () => {

    const history = useHistory()

    const { id } = useParams()

    const { normalForm, permisosReducer } = useSelector(state => state)

    const submit = async (e) => {
        e.preventDefault()
        const prettyForm = {
            ...normalForm,
            productionStatus: undoMultiSelect(normalForm.productionStatus, 'idStatus'),
            Customers: JSON.stringify(permisosReducer.Customers),
            Vendors: JSON.stringify(permisosReducer.Vendors),
            Carriers: JSON.stringify(permisosReducer.Carriers),
            Vehicles: JSON.stringify(permisosReducer.Vehicles),
            Trailers: JSON.stringify(permisosReducer.Trailers),
            Pools: JSON.stringify(permisosReducer.Pools),
            Items: JSON.stringify(permisosReducer.Items),
            Family: JSON.stringify(permisosReducer.Family),
            Purchases: JSON.stringify(permisosReducer.Purchases),
            Orders: JSON.stringify(permisosReducer.Orders),
            Delivery: JSON.stringify(permisosReducer.Delivery),
            Production: JSON.stringify(permisosReducer.Production),
            Calendar: JSON.stringify(permisosReducer.Calendar),
            Users: JSON.stringify(permisosReducer.Users),
            Roles: JSON.stringify(permisosReducer.Roles),
            PaymentMethods: JSON.stringify(permisosReducer.PaymentMethods),
            Departments: JSON.stringify(permisosReducer.Departments),
            AddressesTypes: JSON.stringify(permisosReducer.AddressesTypes),
            Taxes: JSON.stringify(permisosReducer.Taxes),
            CustomerType: JSON.stringify(permisosReducer.CustomerType),
            CustomerCategory: JSON.stringify(permisosReducer.CustomerCategory),
            Activities: JSON.stringify(permisosReducer.Activities),
            Origins: JSON.stringify(permisosReducer.Origins),
            VendorType: JSON.stringify(permisosReducer.VendorType),
            Brand: JSON.stringify(permisosReducer.Brand),
            Model: JSON.stringify(permisosReducer.Model),
            Place: JSON.stringify(permisosReducer.Place),
            Colors: JSON.stringify(permisosReducer.Colors)
        }
        save('Roles', id, prettyForm)
        history.push('/roles')
    }

    return (
        <Form onSubmit={submit}>
            <div className="card">
                <div className=" card-body row pb-3 px-3">
                    <div className="col-md-3">
                        <Input name="name" label="Nombre" />
                    </div>
                </div>
                <Col sm='12'>
                    <div className='permissions border mt-1 mb-4'>
                        <h6 className='py-1 mx-1 mb-0 font-medium-2'>
                            <Lock size={18} className='mr-25' />
                            <span className='align-middle'>Permisos</span>
                        </h6>
                        <Table borderless striped responsive>
                            <thead className='thead-light'>
                                <tr>
                                    <th colspan="2">Módulo</th>
                                    <th>Leer</th>
                                    <th>Añadir</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                    <th colspan="2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Permiso name='Clientes' id='Customers' />
                                <Permiso name='Proveedores' id='Vendors' />
                                <Permiso name='Transportistas' id='Carriers' />
                                <Permiso name='Vehículos' id='Vehicles' />
                                <Permiso name='Remolques' id='Trailers' />
                                <Permiso name='Piscinas' id='Pools' />
                                <Permiso name='Artículos' id='Items' />
                                <Permiso name='Familias' id='Family' />
                                <Permiso name='Compras' id='Purchases' actions='1' />
                                <Permiso name='Pedidos' id='Orders' actions='1' />
                                <Permiso name='Gestor de entregas' id='Delivery' actions='1' />
                                <Permiso name='Producción' id='Production' actions='1' />
                                <Permiso name='Calendario' id='Calendar' />
                                <Permiso name='Usuarios' id='Users' />
                                <Permiso name='Roles' id='Roles' />
                                <Permiso name='Métodos de pago' id='PaymentMethods' />
                                <Permiso name='Departamentos' id='Departments' />
                                <Permiso name='Tipos de dirección' id='AddressesTypes' />
                                <Permiso name='Impuestos' id='Taxes' />
                                <Permiso name='Tipos de clientes' id='CustomerType' />
                                <Permiso name='Categorias de cliente' id='CustomerCategory' />
                                <Permiso name='Actividades' id='Activities' />
                                <Permiso name='Origenes' id='Origins' />
                                <Permiso name='Tipos de proveedor' id='VendorType' />
                                <Permiso name='Marcas' id='Brand' />
                                <Permiso name='Modelos' id='Model' />
                                <Permiso name='Ubicaciones' id='Place' />
                                <Permiso name='Colores' id='Colors' />
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </div>
            <ActionButtons />
        </Form>
    )
}
