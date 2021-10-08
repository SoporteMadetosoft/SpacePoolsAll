import { FileText, MapPin, MoreVertical, Trash, User } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram, faUser } from '@fortawesome/free-solid-svg-icons'

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
    name: 'Inicio de entrega',
    selector: 'deliveryStart',
    sortable: true,
    searchable: true,
    width: '20%'
  },
  {
    name: 'Fin de entrega',
    selector: 'deliveryEnd',
    sortable: true,
    searchable: true,
    width: '20%'
  },
  {
    name: 'Lugar',
    selector: 'gps',
    width: '20%',
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

      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <Link to={`./delivery/edit/${row.id}`}>
                <DropdownItem tag='a' href='/' className='w-100'>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>Ver hoja de entrega</span>
                </DropdownItem>
              </Link>
              <Link to={`./customers/edit/${row.idCustomer}`}>
                <DropdownItem tag='a' href='/' className='w-100'>
                  <FontAwesomeIcon icon={faUser} />
                  <span className='align-middle ml-50'>Cliente</span>
                </DropdownItem>
              </Link>
              <Link to={`./orders/edit/${row.idOrder}`}>
                <DropdownItem tag='a' href='/' className='w-100'>
                  <FontAwesomeIcon icon={faProjectDiagram} />
                  <span className='align-middle ml-50'>Pedido</span>
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