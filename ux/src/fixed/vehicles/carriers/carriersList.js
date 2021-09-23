import { FileText, MoreVertical, Trash } from "react-feather"
import { Badge } from 'reactstrap'
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"

export const carriersList = [
  {
    name: 'Nº',
    selector: 'carrierCode',
    sortable: true,
    searchable: true,
    width: '8%'
  },
  {
    name: 'Nombre',
    selector: 'name',
    sortable: true,
    searchable: true,
    width: '20%'
  },
  {
    name: 'DNI/NIF',
    selector: 'NIF',
    sortable: true,
    searchable: true,
    width: '10%'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    searchable: true,
    width: '19%'
  },
  {
    name: 'Teléfono',
    selector: 'phone',
    sortable: true,
    searchable: true,
    width: '14%'
  },
  {
    name: 'Móvil',
    selector: 'phone2',
    sortable: true,
    searchable: true,
    width: '14%'
  },
  {
    name: 'Estado',
    sortable: true,
    width: '10%',
    cell: row => {
      return (
        <>

          {row.idStatus === 'Activo' ?
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
        <>
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <Link to={`./carriers/edit/${row.id}`}>
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
        </>
      )
    }
  }
]