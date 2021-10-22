import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { handleLoadID, handleStartEditing } from "../../redux/actions/form"
import Badge from "reactstrap/lib/Badge"



export const vendorList = [
  {
    name: 'Nº',
    selector: 'id',
    sortable: true,
    searchable: true,
    width: '8%'
  },
  {
    name: 'Nombre comercial',
    selector: 'comercialName',
    sortable: true,
    searchable: true,
    width: '15%'
  },
  {
    name: 'Cif',
    selector: 'CIF',
    sortable: true,
    searchable: true,
    width: '10%'
  },
  {
    name: 'Teléfono',
    selector: 'phone',
    sortable: true,
    searchable: true,
    width: '12%'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    searchable: true,
    width: '15%'
  },
  {
    name: 'Nombre contacto',
    selector: 'contactName',
    sortable: true,
    searchable: true,
    width: '15%'
  },
  {
    name: 'Tel. contacto',
    selector: 'contactPhone',
    sortable: true,
    searchable: true,
    width: '12%'
  },
  {
    name: 'Estado',
    sortable: true,
    width: '9%',
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

      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <Link to={`./vendors/edit/${row.id}`}>
                <DropdownItem tag='a' href='/' className='w-100'>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>Detalles</span>
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