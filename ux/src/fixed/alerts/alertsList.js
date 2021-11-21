import { Check, MoreVertical } from "react-feather"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import Badge from "reactstrap/lib/Badge"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startLoadingTable } from "../../redux/actions/custom"
import { save } from "../../utility/helpers/Axios/save"

export const alertsList = [

  {
    name: 'Nº',
    selector: 'id',
    searcheable: true,
    sortebale: true,
    width: '8%'
  },
  {
    name: 'Mensaje',
    selector: 'message',
    searcheable: true,
    sortable: true,
    width: '45%'

  },
  {
    name: 'Fecha de caducidad',
    selector: 'date',
    searcheable: true,
    sortable: true,
    width: '25%'

  },
  {
    name: 'Estado',
    selector: 'isDone',
    searcheable: true,
    sortable: true,
    width: '18%',
    cell: row => {
      return (
        <>
          {row.isDone === 1 ?
            (<Badge color='light-success'>
              Visto
            </Badge>)
            :
            (<Badge color='light-danger'>
              No visto
            </Badge>)
          }
        </>
      )
    }
  },
  {
    name: '',
    width: '4%',
    cell: row => {
      const dispatch = useDispatch()
      return (
        <div className='d-flex'>
          {row.isDone !== 0 ? '' :
            (<UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>

                <DropdownItem  className='w-100' onClick={() => {
                  save('Alerts', row.id, { id: row.id, isDone: 1 })
                  dispatch(startLoadingTable('Alerts'))
                }} >
                  <Check size={15} />
                  <span className='align-middle ml-50'>Hecho</span>
                </DropdownItem>


              </DropdownMenu>
            </UncontrolledDropdown>
            )
          }
        </div>
      )
    }
  }

]