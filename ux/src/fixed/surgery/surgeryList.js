import { Check, Slash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from '@fortawesome/pro-light-svg-icons'
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const SurgeryList = [
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
        name: 'Paciente',
        selector: 'patient',
        sortable: true,
        searchable: true,
        width: '15%'
    },
    {
        name: 'Mutua',
        selector: 'mutuaId',
        sortable: true,
        searchable: true,
        width: '20%',
        cell: (row) => row.mutua?.name
    },
    {
        name: 'Centro',
        selector: 'centerId',
        sortable: true,
        searchable: true,
        width: '20%',
        cell: (row) => row.center?.name
    },
    {
        name: 'Doctor',
        selector: 'doctorId',
        sortable: true,
        searchable: true,
        width: '14%',
        cell: (row) => row.doctor?.name
    },
    {
        name: 'Fecha cirugía',
        selector: 'surgeryDate',
        sortable: true,
        searchable: true,
        width: '8%'
    },
    {
        name: 'Hora cirugía',
        selector: 'surgeryTime',
        sortable: true,
        searchable: true,
        width: '8%'
    },
    {
        name: '',
        width: '5%',
        cell: row => {

            const dispatch = useDispatch()
            const ability = useContext(AbilityContext)

            return (
                <div className='d-flex'>
                    {ability.can('update', 'surgery') && (
                        <Link to={`/surgery/edit/${row.id}`}>
                            <DropdownItem toggle={null} href='/' style={{ padding: '0.65rem 0.5rem' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </DropdownItem>
                        </Link>
                    )}
                    {ability.can('delete', 'surgery') && (
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