import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import Badge from "reactstrap/lib/Badge"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from '@fortawesome/pro-light-svg-icons'
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const CenterList = [
    {
        name: 'Nº',
        selector: 'id',
        sortable: true,
        searchable: true,
        width: '10%'
    },
    {
        name: 'Cód Centro',
        selector: 'code',
        sortable: true,
        searchable: true,
        width: '20%'
    },
    {
        name: 'Nombre',
        selector: 'name',
        sortable: true,
        searchable: true,
        width: '25%'
    },
    {
        name: 'Población',
        selector: 'addresses',
        sortable: true,
        searchable: true,
        width: '20%',
        cell: row => {
            //TODO CON-169
            return row.addresses?.name
        }
    },
    {
        name: 'Teléfono',
        selector: 'phone',
        sortable: true,
        searchable: true,
        width: '10%'
    },
    {
        name: 'Estado',
        selector: 'status',
        sortable: true,
        searchable: false,
        select: 'Status',
        width: '10%',
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
                    {ability.can('update', 'centers') && (
                        <Link to={`/center/edit/${row.id}`}>
                            <DropdownItem toggle={null} href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </DropdownItem>
                        </Link>
                    )}
                    {ability.can('delete', 'centers') && (
                        <Link to={`#`} onClick={(e) => {
                            dispatch(startDeleteRegister(row.id))
                        }}>
                            <DropdownItem toggle={null} href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </DropdownItem>
                        </Link>
                    )}
                </div>

            )
        }
    }
]