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

export const DeliveryList = [
    {
        name: 'Nº Albarán',
        selector: 'id',
        sortable: true,
        searchable: true,
        width: '10%'
    },
    // {
    //     name: 'Origen',
    //     selector: 'deliveryOrigin',
    //     sortable: true,
    //     searchable: true,
    //     width: '5%'
    // },
    {
        name: 'Nº Cirugía',
        selector: 'surgeryNum',
        sortable: true,
        searchable: true,
        width: '13%'
    },
    {
        name: 'Nº de poliza',
        selector: 'policyNum',
        sortable: true,
        searchable: true,
        width: '12%'
    },
    {
        name: 'Paciente',
        selector: 'patient',
        sortable: true,
        searchable: true,
        width: '10%'
    },
    {
        name: 'Mutua',
        selector: 'mutuaId',
        sortable: true,
        searchable: true,
        width: '10%',
        cell: row => row.mutua?.name
    },
    {
        name: 'Doctor',
        selector: 'doctorId',
        sortable: true,
        searchable: true,
        width: '10%',
        cell: row => row.doctor?.name
    },
    {
        name: 'Centro',
        selector: 'centerId',
        sortable: true,
        searchable: true,
        width: '10%',
        cell: row => row.center?.name
    },
    {
        name: 'Fecha cirugía',
        selector: 'surgeryDate',
        sortable: true,
        searchable: true,
        width: '10%'
    },
    {
        name: 'Hora cirugía',
        selector: 'surgeryTime',
        sortable: true,
        searchable: true,
        width: '10%'
    },
    // {
    //     name: 'Tipo de operación ',
    //     selector: 'deliveryOrigin',
    //     sortable: true,
    //     searchable: true,
    //     width: '5%'
    // },
    {
        name: '',
        width: '5%',
        cell: row => {

            const dispatch = useDispatch()
            const ability = useContext(AbilityContext)

            return (
                <div className='d-flex'>
                    {ability.can('update', 'delivery') && (
                        <Link to={`delivery/edit/${row.id}`}>
                            <DropdownItem href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </DropdownItem>
                        </Link>
                    )}
                    {ability.can('delete', 'delivery') && (
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