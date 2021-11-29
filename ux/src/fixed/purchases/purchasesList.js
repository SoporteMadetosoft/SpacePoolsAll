import { Check, FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"
import Badge from "reactstrap/lib/Badge"
import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'

export const purchasesList = [

  {
    name: 'Nº',
    selector: 'id',
    sortable: true,
    searchable: true,
    width: '5%'
  },
  {
    name: 'Proveedor',
    selector: 'idVendor',
    sortable: true,
    searchable: true,
    width: '25%'
  },
  {
    name: 'Fecha de compra',
    selector: 'purchaseDate',
    sortable: true,
    searchable: true,
    width: '15%'
  },
  {
    name: 'Fecha de entrega',
    selector: 'deliveryDate',
    sortable: true,
    searchable: true,
    width: '15%'
  },
  {
    name: 'Observaciones',
    selector: 'observations',
    searchable: true,
    searchable: true,
    width: '25%'
  },
  {
    name: 'Estado',
    sortable: true,
    searchable: true,
    width: '10%',
    cell: row => {
      return (
        <>
          {row.idStatus === 1 ?
            (<Badge color='light-primary'>
              Proceso
            </Badge>)
            : row.idStatus === 2 ?
              (<Badge color='light-danger'>
                Incompleto
              </Badge>)
              : row.idStatus === 3 ?
                (<Badge color='light-success'>
                  Recibido
                </Badge>)
                : null
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
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              {row.idStatus !== 3 ? (
                <>
                  {ability.can('update', 'purchases') && (
                    <Link to={`./purchases/edit/${row.id}`}>
                      <DropdownItem tag='a' href='/' className='w-100'>
                        <FileText size={15} />
                        <span className='align-middle ml-50'>Detalles</span>
                      </DropdownItem>
                    </Link>
                  )}
                  {ability.can('actions', 'purchases') && (
                    <Link to={`./purchases/verify/${row.id}`}>
                      <DropdownItem tag='a' href='/' className='w-100'>
                        <Check size={15} />
                        <span className='align-middle ml-50'>Verificar</span>
                      </DropdownItem>
                    </Link>
                  )}
                </>
              ) : (row.idStatus === 3 && ability.can('update', 'purchases')) && (
                <Link to={`./purchases/view/${row.id}`}>
                  <DropdownItem tag='a' href='/' className='w-100'>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>Detalles</span>
                  </DropdownItem>
                </Link>
              )}
              {ability.can('delete', 'purchases') && (
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