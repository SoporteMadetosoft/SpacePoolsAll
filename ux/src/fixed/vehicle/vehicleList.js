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

export const VehicleList = [
    {
        name: 'Nº',
        selector: 'id',
        sortable: true,
        searchable: true,
        width: '10%',
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
        name: 'Matrícula',
        selector: 'plate',
        sortable: true,
        searchable: true,
        width: '25%'
    },
    {
        name: 'Marca',
        selector: 'brandId',
        sortable: true,
        searchable: true,
        width: '30%',
        cell: (row) => row.brand?.name
    },
    {
        name: 'Modelo',
        selector: 'modelId',
        sortable: true,
        searchable: true,
        width: '30%',
        cell: (row) => row.model?.name
    },
    {
        name: '',
        width: '5%',
        cell: row => {

            const dispatch = useDispatch()
            const ability = useContext(AbilityContext)

            return (
                <div className='d-flex'>
                    {ability.can('update', 'vehicles') && (
                        <Link to={`/vehicles/edit/${row.id}`}>
                            <DropdownItem toggle={null} toggle={null} href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </DropdownItem>
                        </Link>
                    )}
                    {ability.can('delete', 'vehicles') && (
                        <Link to={`#`} onClick={(e) => {
                            dispatch(startDeleteRegister(row.id))
                        }}>
                            <DropdownItem toggle={null} toggle={null} href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </DropdownItem>
                        </Link>
                    )}
                </div>

            )
        }
    }
]