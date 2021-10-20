import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ActionButtons } from '../../../components/actionButtons/ActionButtons'
import { save } from '../../../utility/helpers/Axios/save'
import { Form } from 'reactstrap'
import { Input } from '../../../components/form/inputs/Input'
import Col from 'reactstrap/lib/Col'
import { Lock } from 'react-feather'
import Table from 'reactstrap/lib/Table'
import CustomInput from 'reactstrap/lib/CustomInput'
import { Permiso } from './Permiso'

export const RolesForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams()

    const { normalForm } = useSelector(state => state)
    const { name } = normalForm

    const submit = async (e) => {
        e.preventDefault()
        save('Activity', id, normalForm)
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
                                    <th>Módulo</th>
                                    <th>Leer</th>
                                    <th>Añadir</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Permiso name='Clientes' id='Clientes' />
                                <Permiso name='Proveedores' id='Proveedores' />
                                <Permiso name='Transportistas' id='Transportistas' />
                                <Permiso name='Vehículos' id='Vehiculos' />
                                <Permiso name='Remolques' id='Remolques' />
                                <Permiso name='Piscinas' id='Piscinas' />
                                <Permiso name='Artículos' id='Articulos' />
                                <Permiso name='Familias' id='Familias' />
                                <Permiso name='Compras' id='Compras' />
                                <Permiso name='Pedidos' id='Pedidos' />
                                <Permiso name='Gestor de entregas' id='Gestor_de_entregas' />
                                <Permiso name='Producción' id='Produccion' />
                                <Permiso name='Calendario' id='Calendario' />
                                <Permiso name='Usuarios' id='Usuarios' />
                                <Permiso name='Roles' id='Roles' />
                                <Permiso name='Métodos de pago' id='Metodos_de_pago' />
                                <Permiso name='Departamentos' id='Departamentos' />
                                <Permiso name='Tipos de dirección' id='Tipos_de_direccion' />
                                <Permiso name='Impuestos' id='Impuestos' />
                                <Permiso name='Tipos de clientes' id='Tipos_de_clientes' />
                                <Permiso name='Categorias de cliente' id='Categorias_de_cliente' />
                                <Permiso name='Actividades' id='Actividades' />
                                <Permiso name='Origenes' id='Origenes' />
                                <Permiso name='Tipos de proveedor' id='Tipos_de_proveedor' />
                                <Permiso name='Marcas' id='Marcas' />
                                <Permiso name='Modelos' id='Modelos' />
                                <Permiso name='Ubicaciones' id='Ubicaciones' />
                                <Permiso name='Colores' id='Colores' />
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </div>
            <ActionButtons />
        </Form>
    )
}
