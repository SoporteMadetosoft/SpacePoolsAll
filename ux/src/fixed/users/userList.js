import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from '@fortawesome/pro-light-svg-icons'
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import Badge from "reactstrap/lib/Badge"

export const UserList = [
    {
        name: 'Nº',
        selector: 'id',
        sortable: true,
        searchable: true,
        width: '8%'
    },
    {
        name: 'Nombre',
        selector: 'fullName',
        sortable: true,
        searchable: true,
        width: '25%'
    },
    {
        name: 'Login',
        selector: 'login',
        sortable: true,
        searchable: true,
        width: '25%'
    },
    {
        name: 'Rol',
        selector: 'role',
        sortable: true,
        searchable: false,
        width: '25%',
        cell: (row) => row.role?.name
    },
    {
        name: 'Estado',
        selector: 'status',
        sortable: true,
        searchable: true,
        select: 'Status',
        customOptions: [
            { value: true, label: 'Activo' },
            { value: false, label: 'Inactivo' }
        ],
        width: '9%',
        cell: row => {
            return (
                <>
                    {row.status === true
                        ? (<Badge color='light-success'>Activo</Badge>)
                        : (<Badge color='light-danger'>Inactivo</Badge>)
                    }
                </>
            )
        }
    },
    {
        name: '',
        width: '5%',
        cell: row => {

            const dispatch = useDispatch()
            const ability = useContext(AbilityContext)

            return (
                <div className='d-flex'>
                    {ability.can('update', 'users') && (
                        <Link to={`/user/edit/${row.id}`}>
                            <DropdownItem tag='a' href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </DropdownItem>
                        </Link>
                    )}
                    {ability.can('delete', 'users') && (
                        <Link onClick={(e) => {
                            dispatch(startDeleteRegister(row.id))
                        }}>
                            <DropdownItem tag='a' href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </DropdownItem>
                        </Link>
                    )}
                </div>

            )
        }
    }
]