import { ArrowLeft, ArrowRight, Check, FileText, MoreVertical, Trash, X } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister, startLoadingTable } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { Spinner } from 'reactstrap'
import { switchStart } from "../../utility/helpers/Axios/switchStart"
import { save } from "../../utility/helpers/Axios/save"
import { handleCleanForm } from '@redux/actions/normalForm'
import axios from "axios"
import { endPoints } from "@fixed/endPoints"





function renderSwitch(param) {

  switch (param) {
    case 1:
      return 'Pintura'

    case 2:
      return 'Laminar 1'

    case 3:
      return 'Laminar 2'

    case 4:
      return 'Montaje'

    case 5:
      return 'Proyectado'

    case 6:
      return 'Acabado'

    default:
      return 'En cola'

  }


}

export const ProductionsList = [
  {
    name: 'Nº',
    selector: 'id',
    sortable: true,
    searchable: true,
    width: '8%'
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
    width: '15%'
  },
  {
    name: 'Fecha de Pedido',
    selector: 'orderDate',
    sortable: true,
    searchable: true,
    width: '14%'
  },
  {
    name: 'Fecha de Entrega',
    selector: 'deliveryDate',
    sortable: true,
    searchable: true,
    width: '14%'
  },
  {
    name: 'Horario de entrega',
    selector: 'deliveryTime',
    width: '14%'
  },
  {
    name: 'Observaciones',
    selector: 'observations',
    width: '11%'
  },
  {
    name: 'Estado',
    sortable: true,
    width: '12%',
    cell: row => {
      const proceso_prod = row.idProductionStatus
      const dispatch = useDispatch()
      return (
        <>
        

          {proceso_prod >= 2 && proceso_prod <= 5 ? (<Link onClick={() => {
            save('Productions', row.id, { id: row.id, idProductionStatus: row.idProductionStatus - 1 })
            dispatch(startLoadingTable('Productions'))
          }}><ArrowLeft size={15} color='black' /></Link>) : ''
         
          }

          {renderSwitch(proceso_prod)}

          {proceso_prod < 6 ? (<Link onClick={() => {
            save('Productions', row.id, { id: row.id, idProductionStatus: row.idProductionStatus + 1 })
            dispatch(startLoadingTable('Productions'))
              if ( (row.idProductionStatus + 1) === 6 ) {
                axios.put(`${process.env.REACT_APP_HOST_URI}${endPoints['Orders']}/switchState`, { id: row.orderCode, state : 1 })
              }             
          }}><ArrowRight size={15} color='black' /></Link>) : ''
          
            

          }

          



        </>

      )
    }
  },
  {
    name: '',
    width: '2%',
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

