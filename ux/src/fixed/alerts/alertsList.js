import { MoreVertical } from "react-feather"
import Badge from "reactstrap/lib/Badge"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"





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
          {row.isDone === 0 ?
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
    width: '5%',
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              {/* {ability.can('update', 'orders') && (
                  <Link to={`./orders/edit/${row.id}`}>
                    <DropdownItem tag='a' href='/' className='w-100'>
                      <FileText size={15} />
                      <span className='align-middle ml-50'>Detalles</span>
                    </DropdownItem>
                  </Link>
                )} */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }

]