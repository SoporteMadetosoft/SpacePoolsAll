import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"


export const ordersList = [
        {
            name: 'Nº',
            selector: 'orderCode',
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
                    <Link to={`./purchase/edit/${row.id}`}>
                      <DropdownItem tag='a' href='/' className='w-100'>
                        <FileText size={15} />
                        <span className='align-middle ml-50'>Detalles</span>
                      </DropdownItem>
                      </Link>
                      <Link onClick={ (e) => {
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