import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from '@fortawesome/pro-light-svg-icons'
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const IncidenceReasonList = [
    {
        name: 'Nº Motivo',
        selector: 'id',
        sortable: true,
        width: '10%'
    },
    {
        name: 'Motivo de incidencia',
        selector: 'name',
        sortable: true,
        searchable: true,
        width: '85%'
    },
    {
        name: '',
        width: '5%',
        cell: row => {

            const dispatch = useDispatch()
            const ability = useContext(AbilityContext)

            return (
                <div className='d-flex'>
                    {ability.can('update', 'incidenceReason') && (
                        <Link to={`/setup/incidences/incidence-reason/edit/${row.id}`}>
                            <DropdownItem href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </DropdownItem>
                        </Link>
                    )}
                    {ability.can('delete', 'incidenceReason') && (
                        <Link to={`#`} onClick={(e) => {
                            dispatch(startDeleteRegister(row.id))
                        }}>
                            <DropdownItem href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </DropdownItem>
                        </Link>
                    )}
                </div>

            )
        }
    }
]