import { FileText, MoreVertical, Tool, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"

export const trailersList = [
    {
        name: 'Nº',
        selector: 'id',
        sortable: true,
        width: '8%'
    },
    {
        name: 'Matrícula del remolque',
        selector: 'plate',
        sortable: true,
        searchable: true,
        width: '22%'
    },
    {
        name: 'Marca',
        selector: 'brand',
        sortable: true,
        searchable: true,
        width: '22%'
    },
    {
        name: 'Modelo',
        selector: 'model',
        sortable: true,
        searchable: true,
        width: '22%'
    },
    {
        name: 'Fecha de ITV',
        selector: 'ITVdate',
        sortable: true,
        searchable: true,
        width: '22%'
    },
    {
        name: '',
        width: '5%',
        cell: (row, index) => {

            const dispatch = useDispatch()

            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <Link to={`./trailers/edit/${row.id}`}>
                                <DropdownItem tag='a' href='/' className='w-100'>
                                    <FileText size={15} />
                                    <span className='align-middle ml-50'>Detalles</span>
                                </DropdownItem>
                            </Link>
                            <Link to={`./trailers/tReparation/${index}`}>
                                <DropdownItem tag='a' href='/' className='w-100'>
                                    <Tool size={15} />
                                    <span className='align-middle ml-50'>Reparaciones</span>
                                </DropdownItem>
                            </Link>
                            <Link onClick={(e) => {
                                dispatch(startDeleteRegister(row.id))
                            }}>
                                <DropdownItem tag='a' href='/' className='w-100'>
                                    <Trash size={15} />
                                    <span className='align-middle ml-50'>Eliminar</span>
                                </DropdownItem>
                            </Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
]