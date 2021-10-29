import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import { useParams } from 'react-router'

import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRepairRegister } from "../../../redux/actions/custom"

import { Link } from "react-router-dom"
import { datetimeToEuropeDate } from "../../../utility/helpers/dates"
import { changeToEuro } from "../../../utility/helpers/converterEuros"

import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'

export const tRepairList = [
    {
        name: 'Nº',
        selector: 'id',
        sortable: true,
        searchable: true,
        width: '8%'
    },
    {
        name: 'Fecha',
        selector: 'date',
        width: '22%',
        cell: row => {
            const fecha = row.date

            return (
                <>
                    <div>
                        <span>{datetimeToEuropeDate(new Date(fecha))}</span>

                    </div>
                </>
            )



        }
    },
    {
        name: 'Descripción',
        selector: 'description',
        sortable: true,
        searchable: true,
        width: '22%'
    },
    {
        name: 'Taller',
        selector: 'garage',
        sortable: true,
        searchable: true,
        width: '22%'
    },
    {
        name: 'Coste',
        selector: 'cost',
        sortable: true,
        searchable: true,
        width: '22%',
        cell: row => {
            return (
                <div>
                    <span>{changeToEuro(row.cost)}</span>
                </div>
            )
        }
    },
    {
        name: '',
        width: '5%',
        cell: row => {

            const dispatch = useDispatch()
            const { id } = useParams()
            const ability = useContext(AbilityContext)

            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            {ability.can('update', 'trailers') && (
                                <Link to={`./${id}/edit/${row.id}`}>
                                    <DropdownItem tag='a' href='/' className='w-100'>
                                        <FileText size={15} />
                                        <span className='align-middle ml-50'>Detalles</span>
                                    </DropdownItem>
                                </Link>
                            )}
                            {ability.can('delete', 'trailers') && (
                                <Link onClick={(e) => {
                                    dispatch(startDeleteRepairRegister(row.id, id, 'TRepair'))
                                }}>
                                    <DropdownItem tag='a' href='/' className='w-100'>
                                        <Trash size={15} />
                                        <span className='align-middle ml-50'>Eliminar</span>
                                    </DropdownItem>
                                </Link>
                            )}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
]