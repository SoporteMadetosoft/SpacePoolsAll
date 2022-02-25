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

export const MutuaList = [
    {
        name: 'Nº',
        selector: 'id',
        sortable: true,
        searchable: true,
        width: '8%',
        cell: row => {
            return (
                <div className="d-flex">
                    {row.mode === true
                        ? (<Check className="mr-1" color="green" size={15} />)
                        : (<Slash className="mr-1" color="red" size={15} />)
                    }
                    <label>{row.id}</label>
                </div>
            )
        }
    },
    {
        name: 'Nombre',
        selector: 'name',
        sortable: true,
        searchable: true,
        width: '75%'
    },
    {
        name: 'Estado',
        selector: 'status',
        sortable: true,
        searchable: false,
        select: 'Status',
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
                    {ability.can('update', 'mutuas') && (
                        <Link to={`/mutuas/edit/${row.id}`}>
                            <DropdownItem tag='a' href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </DropdownItem>
                        </Link>
                    )}
                    {ability.can('delete', 'mutuas') && (
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