import { Eye, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { Link } from "react-router-dom"
import { startDeleteFile } from "../../redux/actions/fileUpload"

export const DocSchema = [
    {
        name: 'Documento',
        selector: 'filename',
        sortable: true,
        searchable: true,
        width: '31%'
    },
    {
        name: 'Tamaño',
        selector: 'filesize',
        sortable: true,
        searchable: true,
        width: '31%'
    },
    {
        name: 'Tipo de documento',
        selector: 'filetype',
        sortable: true,
        searchable: true,
        width: '31%'
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
                            <Link to={`${row.url}`} target="_blank">
                                <DropdownItem toggle={null} className='w-100'>
                                    <Eye size={15} />
                                    <span className='align-middle ml-50'>Ver documento</span>
                                </DropdownItem>
                            </Link>
                            <Link to={`#`} onClick={(e) => {
                                dispatch(startDeleteFile(index, row.url))
                            }}>
                                <DropdownItem toggle={null} href='/' className='w-100'>
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