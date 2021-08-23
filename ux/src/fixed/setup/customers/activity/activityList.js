import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"

export const activityList = [
    {
        name: 'ID',
        selector: 'id',
        sortable: true,
        minWidth: '50px',
        width: '100px'
    },
    {
        name: 'Actividad',
        selector: 'name',
        sortable: true,
        searchable: true,
        minWidth: '450px'
    },
    {
        name: 'Acciones',
        width: '150px',
        cell: row => {
          
          const dispatch = useDispatch()

          return (
            <div className='d-flex'>
              <UncontrolledDropdown>
                <DropdownToggle className='pr-1' tag='span'>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right>
                <Link to={`./activity/edit/${row.id}`}>
                  <DropdownItem tag='a' href='/' className='w-100'>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>Detalles</span>
                  </DropdownItem>
                  </Link>
                  <DropdownItem tag='a' href='/' className='w-100' onClick={ (e) => {
                    e.preventDefault()
                    dispatch(startDeleteRegister(row.id))
                    }}>
                    <Trash size={15} />
                    <span className='align-middle ml-50'>Eliminar</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )
        }
      }
]