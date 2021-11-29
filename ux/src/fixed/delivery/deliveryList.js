import { FileText, MapPin, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'

export const deliveryList = [
  {
    name: 'Nº',
    selector: 'idOrder',
    sortable: true,
    searchable: true,
    width: '8%'
  },
  {
    name: 'Cliente',
    selector: 'Customer',
    sortable: true,
    searchable: true,
    width: '20%'
  },
  {
    name: 'Transportista',
    selector: 'carrier',
    sortable: true,
    searchable: true,
    width: '20%'
  },

  {
    name: 'Inicio de entrega',
    selector: 'deliveryStart',
    sortable: true,
    searchable: true,
    width: '16%'
  },
  {
    name: 'Fin de entrega',
    selector: 'deliveryEnd',
    sortable: true,
    searchable: true,
    width: '16%'
  },
  {
    name: 'Lugar',
    selector: 'gps',
    width: '16%',
    searchable: true,
    cell: row => {
      return (
        <>
          <a href={`${row.gps}`} target="_blank">
            <MapPin size={15} />
            <span className='align-middle ml-50'>Localización</span>
          </a>
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
              {ability.can('update', 'delivery') && (
                <Link to={`./delivery/edit/${row.id}`}>
                  <DropdownItem tag='a' href='/' className='w-100'>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>Detalles del pedido</span>
                  </DropdownItem>
                </Link>
              )}
              {ability.can('actions', 'delivery') && (
                <Link to={`./delivery/note/${row.id}`}>
                  <DropdownItem tag='a' href='/' className='w-100'>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>Albarán de entrega</span>
                  </DropdownItem>
                </Link>
              )}
              {ability.can('delete', 'delivery') && (
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