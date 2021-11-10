import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import Badge from "reactstrap/lib/Badge"
import { setCurrency } from "../../utility/helpers/setCurrency"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'

export const poolsList = [
    {
        name: 'Nº',
        selector: 'poolCode',
        sortable: true,
        searchable: true,
        minWidth: '50px',
        width: '8%'
    },
    {
        name: 'Nombre (fabricación)',
        selector: 'fabricationName',
        sortable: true,
        searchable: true,
        width: '14%'
    },
    {
        name: 'Nombre (Europa)',
        selector: 'nameEuropa',
        sortable: true,
        searchable: true,
        width: '14%'
    },
    {
        name: 'Nombre (Space)',
        selector: 'nameSpace',
        sortable: true,
        searchable: true,
        width: '14%'
    },
    {
        name: 'Nombre (Sociedad)',
        selector: 'nameSociedad',
        sortable: true,
        searchable: true,
        width: '14%'
    },
    {
        name: 'Nombre (Hydrius)',
        selector: 'nameHydrius',
        sortable: true,
        searchable: true,
        width: '14%'
    },
    {
        name: 'Coste',
        selector: 'cost',
        sortable: true,
        searchable: true,
        width: '8%',
        cell: row => {
            return (
                <div>
                    <span>{setCurrency(row.cost)}</span>
                </div>
            )
        }
    },
    {
        name: 'Estado',
        sortable: true,
        searchable: true,
        width: '10%',
        cell: row => {
            return (
                <>

                    {row.idStatus === 2 ?
                        (<Badge color='light-success'>
                            Activo
                        </Badge>)
                        :
                        (<Badge color='light-danger'>
                            Inactivo
                        </Badge>)
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
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            {ability.can('update', 'pools') && (
                                <Link to={`./pools/edit/${row.id}`}>
                                    <DropdownItem tag='a' href='/' className='w-100'>
                                        <FileText size={15} />
                                        <span className='align-middle ml-50'>Detalles</span>
                                    </DropdownItem>
                                </Link>
                            )}
                            {ability.can('delete', 'pools') && (
                                <Link onClick={(e) => {
                                    dispatch(startDeleteRegister(row.id))
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