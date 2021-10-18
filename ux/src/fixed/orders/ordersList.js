import { FileText, MoreVertical, Trash, Clipboard } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { Link } from "react-router-dom"
import Badge from "reactstrap/lib/Badge"
import { startDeleteRegister, startLoadingTable, startSelectDriver } from "@redux/actions/custom"
import { changeToEuro } from "../../utility/helpers/converterEuros"



export const ordersList = [
  {
    name: 'Nº',
    selector: 'id',
    sortable: true,
    searchable: true,
    minWidth: '50px',
    width: '5%'
  },
  {
    name: 'cliente',
    selector: 'customerName',
    sortable: true,
    searchable: true,
    minWidth: '200px'
  },
  {
    name: 'Teléfono',
    selector: 'customerPhone',
    searchable: true,
    minWidth: '200px'
  },
  {
    name: 'correo Electrónico',
    selector: 'customerEmail',
    searchable: true,
    minWidth: '200px'
  },
  {
    name: 'Fecha de entrega',
    selector: 'deliveryDate',
    sortable: true,
    searchable: true,
    minWidth: '200px'
  },
  {
    name: 'horario de entrega',
    selector: 'deliveryTime',
    minWidth: '200px'
  },
  {
    name: 'Fecha de pedido',
    selector: 'orderDate',
    sortable: true,
    searchable: true,
    minWidth: '200px'
  },
  {
    name: 'precio',
    selector: 'price',
    sortable: true,
    searchable: true,
    minWidth: '200px',
    cell: row => {
      return (
        <div>
          <span>{changeToEuro(row.price)}</span>
        </div>
      )
    }
  },
  {
    name: 'Estado',
    sortable: true,
    width: '8%',
    cell: row => {
      const proceso_prod = row.state

      return (
        <>

          {proceso_prod === 1 ?
            (<Badge color='light-success'>
              Finalizado
            </Badge>)
            :
            (<Badge color='light-danger'>
              En proceso
            </Badge>)

          }


        </>

      )
    }
  },


  {
    name: 'Acciones',
    width: '150px',
    cell: row => {

      const dispatch = useDispatch()
      const proceso_prod = row.state

      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <Link to={`./orders/edit/${row.id}`}>
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
              {proceso_prod === 1 ? <Link onClick={(e) => {
                dispatch(startSelectDriver(row.id))
              }}>
                <DropdownItem tag='a' href='/' className='w-100'>
                  <Clipboard  size={15}/>
                  <span className='align-middle ml-50'>Albarán pedido</span>
                </DropdownItem>
              </Link> : ''}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }

]