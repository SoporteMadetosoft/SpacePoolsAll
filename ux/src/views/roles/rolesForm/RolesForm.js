import React from 'react'
import { useSelector } from 'react-redux'
import { Lock } from 'react-feather'
import Table from 'reactstrap/lib/Table'
import { Permiso } from './Permiso'

export const RolesForm = () => {

    const { permisosReducer } = useSelector(state => state)

    return (
        <div className='permissions mt-2 mb-2'>
            <h6 className='py-1 mx-1 mb-0 font-medium-2'>
                <Lock size={18} className='mr-25' />
                <span className='align-middle'>Permisos</span>
            </h6>
            <Table borderless striped responsive>
                <thead className='thead-light'>
                    <tr>
                        <th colspan="2">Módulo</th>
                        <th >Leer</th>
                        <th >Añadir</th>
                        <th >Detalles</th>
                        <th >Eliminar</th>
                        <th colspan="2" >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(permisosReducer).map((permiso) => (
                            <Permiso id={permiso[0]}
                                add={permiso[1].insert}
                                edit={permiso[1].update}
                                del={permiso[1].delete}
                                actions={permiso[1].actions}
                            />
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}
