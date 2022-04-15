import { Check, Slash } from "react-feather"
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

export const SaleList = [
    {
        name: 'Nº Sale',
        selector: 'id',
        sortable: true,
        searchable: true,
        width: '10%'
    },
    {
        name: 'Centro',
        selector: 'centerId',
        sortable: true,
        searchable: false,
        select: 'Center',
        width: '75%',
        cell: row => row.center?.name
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
                    {ability.can('update', 'sales') && (
                        <Link to={`sales/edit/${row.id}`}>
                            <DropdownItem toggle={null} href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </DropdownItem>
                        </Link>
                    )}
                    {ability.can('delete', 'sales') && (
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