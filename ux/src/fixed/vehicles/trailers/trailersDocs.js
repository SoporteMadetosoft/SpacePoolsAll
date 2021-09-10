import { Eye, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { Link } from "react-router-dom"
import { editRepeaterRegister } from "../../../redux/actions/normalForm"
import { startDeleteFile } from "../../../redux/actions/fileUpload"

export const trailersDocs = [
    {
        name: 'Nombre',
        selector: 'name',
        sortable: true,
        searchable: true,
        width: '19%',
        cell: (row, index) => {

            const dispatch = useDispatch()

            const handleInputChange = ({ target }) => {

                const obj = {
                    name: target.name,
                    value: target.value
                }

                dispatch(
                    editRepeaterRegister('documents', index, obj)
                )
            }

            return (
                <div className='d-flex'>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={row.name}
                        onChange={handleInputChange}
                    />
                </div>
            )
        }
    },
    {
        name: 'Documento',
        selector: 'filename',
        sortable: true,
        searchable: true,
        width: '19%'
    },
    {
        name: 'Tamaño',
        selector: 'filesize',
        sortable: true,
        searchable: true,
        width: '18%'
    },
    {
        name: 'Tipo de documento',
        selector: 'filetype',
        sortable: true,
        searchable: true,
        width: '18%'
    },
    {
        name: 'Caducidad',
        selector: 'expiration',
        sortable: true,
        searchable: true,
        width: '18%',
        cell: (row, index) => {

            const dispatch = useDispatch()

            const handleInputChange = ({ target }) => {

                const obj = {
                    name: target.name,
                    value: target.value
                }

                dispatch(
                    editRepeaterRegister('documents', index, obj)
                )
            }

            return (
                <div className='d-flex'>
                    <input
                        className="form-control"
                        type="date"
                        name="expiration"
                        value={row.expiration}
                        onChange={handleInputChange}
                    />
                </div>
            )
        }
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
                                <DropdownItem className='w-100'>
                                    <Eye size={15} />
                                    <span className='align-middle ml-50'>Ver archivo</span>
                                </DropdownItem>
                            </Link>
                            <Link onClick={(e) => {
                                dispatch(startDeleteFile(index, row.url))
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