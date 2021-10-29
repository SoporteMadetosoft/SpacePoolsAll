import { ChevronLeft, ChevronRight, FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister, startLoadingTable } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import { Spinner } from 'reactstrap'

import { save } from "../../utility/helpers/Axios/save"

import axios from "axios"
import { endPoints } from "@fixed/endPoints"
import Badge from "reactstrap/lib/Badge"

import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'

function renderSwitch(param) {

  switch (param) {
    case 1:
      return (<><Badge color='light-secondary'>Pintura</Badge></>)

    case 2:
      return (<><Badge color='light-dark'>Laminar 1</Badge></>)

    case 3:
      return (<><Badge color='light-dark'>Laminar 2</Badge></>)

    case 4:
      return (<><Badge color='light-info'>Montaje</Badge></>)

    case 5:
      return (<><Badge color='light-primary'>Proyectado</Badge></>)

    case 6:
      return (<><Badge color='light-success'>Acabado</Badge></>)

    default:
      return (<><Badge color='light-dark'>En cola</Badge></>)

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
    searchable: true,
    searchable: true,
    width: '14%'
  },
  {
    name: 'Observaciones',
    selector: 'observations',
    searchable: true,
    searchable: true,
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
        <div className="d-flex justify-content-start">
          {proceso_prod >= 2 && proceso_prod <= 5 ?
            (
              <Link onClick={() => {
                save('Productions', row.id, { id: row.id, idProductionStatus: row.idProductionStatus - 1 })
                dispatch(startLoadingTable('Productions'))
              }}>
                <Badge color='light-dark' className="mr-1"><ChevronLeft size={15} /></Badge>
              </Link>
            ) : ''

          }

          {renderSwitch(proceso_prod)}

          {proceso_prod < 6 ?
            (
              <Link onClick={() => {
                save('Productions', row.id, { id: row.id, idProductionStatus: row.idProductionStatus + 1 })
                dispatch(startLoadingTable('Productions'))
                if ((row.idProductionStatus + 1) === 6) {
                  axios.put(`${process.env.REACT_APP_HOST_URI}${endPoints['Orders']}/switchState`, { id: row.idOrder, state: 1 })
                }
              }}>
                <Badge color='light-dark' className="ml-1"><ChevronRight size={15} /></Badge>
              </Link>
            ) : ''

          }

        </div>

      )
    }
  },
  {
    name: '',
    width: '2%',
    cell: row => {

      const dispatch = useDispatch()
      const ability = useContext(AbilityContext)

      return (
        <>

          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                {ability.can('update', 'production') && (
                  <Link to={`./production/edit/${row.id}`}>
                    <DropdownItem tag='a' href='/' className='w-100'>
                      <FileText size={15} />
                      <span className='align-middle ml-50'>Detalles</span>
                    </DropdownItem>
                  </Link>
                )}
                {ability.can('delete', 'production') && (
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

