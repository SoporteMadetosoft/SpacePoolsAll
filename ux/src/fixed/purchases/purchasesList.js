import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"

export const purchasesList = [
  {
    name: 'Nº',
    selector: 'purchaseCode',
    sortable: true,
    searchable: true,
    width: '5%'
  },
  {
    name: 'Proveedor',
    selector: 'idVendor',
    sortable: true,
    searchable: true,
    width: '23%'
  },
  {
    name: 'Fecha de compra',
    selector: 'purchaseDate',
    sortable: true,
    width: '22%'
  },
  {
    name: 'Fecha de entrega',
    selector: 'deliveryDate',
    sortable: true,
    width: '22%'
  },
  {
    name: 'Observaciones',
    selector: 'observations',
    width: '24%'
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
              <Link to={`./purchases/edit/${row.id}`}>
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