import { Check, FileText, MoreVertical, Trash, X } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { Spinner } from 'reactstrap'
import { switchStart } from "../../utility/helpers/Axios/switchStart"

export const ProductionsList = [
    {
        name: 'Nº',
        selector: 'id',
        sortable: true,
        searchable: true,
        width: '6%'
    },
    {
        name: 'Nº Pedido',
        selector: 'orderCode',
        sortable: true,
        searchable: true,
        width: '8%'
    },
    {
        name: 'Piscina',
        selector: 'pool',
        sortable: true,
        searchable: true,
        width: '18%'
    },
    {
        name: 'Fecha de Pedido',
        selector: 'orderDate',
        sortable: true,
        searchable: true,
        width: '15%'
    },
    {
        name: 'Fecha de Entrega',
        selector: 'deliveryDate',
        sortable: true,
        searchable: true,
        width: '15%'
    },
    {
        name: 'Horario de entrega',
        selector: 'deliveryTime',
        width: '15%'
    },
    {
        name: 'Observaciones',
        selector: 'observations',
        width: '18%'
    },
    {
        name: '',
        width: '8%',
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
                <Link to={`./production/edit/${row.id}`}>
                  <DropdownItem tag='a' href='/' className='w-100'>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>Detalles</span>
                  </DropdownItem>
                </Link>
                {row.isStarted === 0 ? 
                  (<Link onClick={(e) => {
                    switchStart(row.id, 'Productions')
                  }}>
                    <DropdownItem tag='a' href='/' className='w-100'>
                      <Check size={15} />
                      <span className='align-middle ml-50'>Iniciar Tarea</span>
                    </DropdownItem>
                  </Link>)
                :
                  (<Link onClick={(e) => {
                    switchStart(row.id, 'Productions')
                  }}>
                    <DropdownItem tag='a' href='/' className='w-100'>
                      <X size={15} />
                      <span className='align-middle ml-50'>Finalizar Tarea</span>
                    </DropdownItem>
                  </Link>)
                }
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
            {row.isStarted === 1 && 
              ( 
                <Spinner color='success' size='sm' />
              )
            }
            </>
          )
        }
      }
]