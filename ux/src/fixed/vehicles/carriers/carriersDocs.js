import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"

export const carriersDocs = [
    {
        name: 'Nombre del documento',
        selector: 'filename',
        sortable: true,
        width: '24%'
    },
    {
        name: 'Tamaño',
        selector: 'filesize',
        sortable: true,
        searchable: true,
        width: '24%'
    },
    {
        name: 'Tipo de documento',
        selector: 'filetype',
        sortable: true,
        searchable: true,
        width: '24%'
    },
    {
        name: 'Fecha de subida',
        selector: 'mtime',
        sortable: true,
        searchable: true,
        width: '24%'
    },
    {
        name: '',
        width: '5%',
        cell: row => {

            const dispatch = useDispatch()

            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem className='w-100'>
                                <a href={`${row.url}`} target="_blank" rel="canonical">

                                    <FileText size={15} />
                                    <span className='align-middle ml-50'>Detalles</span>
                                </a>
                            </DropdownItem>
                            {/* <Link onClick={(e) => {
                                dispatch(startDeleteRegister(row.id))
                            }}>
                                <DropdownItem tag='a' href='/' className='w-100'>
                                    <Trash size={15} />
                                    <span className='align-middle ml-50'>Eliminar</span>
                                </DropdownItem>
                            </Link> */}
                        </DropdownMenu>
                    </UncontrolledDropdown>



                </div>
            )
        }
    }
]

//<a href={`file://\/${row.url}`} target="_blank" rel="canonical">