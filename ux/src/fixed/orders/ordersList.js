import { FileText, MoreVertical, Trash, Clipboard } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { Link } from "react-router-dom"
import Badge from "reactstrap/lib/Badge"
import { startDeleteRegister, startSelectDriver } from "@redux/actions/custom"
import { setCurrency } from "../../utility/helpers/setCurrency"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'


export const ordersList = [
  {
    name: 'Nº',
    selector: 'id',
    sortable: true,
    searchable: true,
    width: '8%'
  },
  {
    name: 'cliente',
    selector: 'customerName',
    sortable: true,
    searchable: true,
    width: '15%'
  },
  {
    name: 'Teléfono',
    selector: 'customerPhone',
    searchable: true,
    width: '10%'
  },
  {
    name: 'correo Electrónico',
    selector: 'customerEmail',
    searchable: true,
    width: '15%'
  },
  {
    name: 'Fecha de entrega',
    selector: 'deliveryDate',
    sortable: true,
    searchable: true,
    width: '8%'
  },
  {
    name: 'horario de entrega',
    selector: 'deliveryTime',
    searchable: true,
    searchable: true,
    width: '12%'
  },
  {
    name: 'Fecha de pedido',
    selector: 'orderDate',
    sortable: true,
    searchable: true,
    width: '8%'
  },
  {
    name: 'precio',
    selector: 'price',
    sortable: true,
    searchable: true,
    width: '10%',
    cell: row => {
      return (
        <div>
          <span>{setCurrency(row.price)}</span>
        </div>
      )
    }
  },
  {
    name: 'Estado',
    sortable: true,
    searchable: true,
    width: '10%',
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
    width: '5%',
    searchable: true,
    cell: row => {
      const dispatch = useDispatch()
      const idProductionStatus = row.idProductionStatus

      const ability = useContext(AbilityContext)

      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              {ability.can('update', 'orders') && (
                <Link to={`./orders/edit/${row.id}`}>
                  <DropdownItem tag='a' href='/' className='w-100'>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>Detalles</span>
                  </DropdownItem>
                </Link>
              )}
              {ability.can('actions', 'orders') && idProductionStatus >= 5 && <Link onClick={(e) => {
                dispatch(startSelectDriver({ idOrder: row.id, idCustomer: row.idCustomer }, 'Delivery'))
              }}>
                <DropdownItem tag='a' href='/' className='w-100'>
                  <Clipboard size={15} />
                  <span className='align-middle ml-50'>Albarán pedido</span>
                </DropdownItem>
              </Link>
              }
              {ability.can('delete', 'orders') && (
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