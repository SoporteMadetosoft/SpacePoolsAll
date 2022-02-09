import { Check, Slash, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import Badge from "reactstrap/lib/Badge"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from '@fortawesome/pro-light-svg-icons'

export const customerList = [
  {
    name: 'Nº',
    selector: 'id',
    sortable: true,
    searchable: true,
    width: '8%',
    cell: row => {
      return (
        <div className="d-flex">
          {row.idMode === 1 ?
            (<Check className="mr-1" color="green" size={15} />)
            :
            (<Slash className="mr-1" color="red" size={15} />)
          }
          <label>{row.id}</label>
        </div>
      )
    }
  },
  {
    name: 'Nombre comercial',
    selector: 'comercialName',
    sortable: true,
    searchable: true,
    width: '15%'
  },
  {
    name: 'CIF',
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
    selector: 'ContactName',
    sortable: true,
    searchable: true,
    width: '15%'
  },
  {
    name: 'Tel. con.',
    selector: 'ContactPhone',
    sortable: true,
    searchable: true,
    width: '12%'
  },
  {
    name: 'Estado',
    selector: 'idStatus',
    sortable: true,
    searchable: false,
    select: 'Status',
    width: '9%',
    cell: row => {
      return (
        <>

          {row.idStatus === 2
            ? (<Badge color='light-success'>Activo</Badge>)
            : (<Badge color='light-danger'>Inactivo</Badge>)
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
          {ability.can('update', 'customers') && (
            <Link to={`/customers/edit/${row.id}`}>
              <DropdownItem tag='a' href='/' className='w-100 greenhover' style={{ padding: '0.6rem' }}>
                <FontAwesomeIcon icon={faEdit} />
              </DropdownItem>
            </Link>
          )}
          {ability.can('delete', 'customers') && (
            <Link onClick={(e) => {
              dispatch(startDeleteRegister(row.id))
            }}>
              <DropdownItem tag='a' href='/' className='w-100'>
                <Trash size={15} />
                <span className='align-middle ml-50'>Eliminar</span>
              </DropdownItem>
            </Link>
          )}
        </div>
      )
    }
  }
]