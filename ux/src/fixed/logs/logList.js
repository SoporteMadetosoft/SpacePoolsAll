import { MoreVertical } from "react-feather"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"

export const logList = [

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
    width: '30%'
  },
  {
    name: 'Fecha',
    selector: 'logDate',
    searcheable: true,
    sortable: true,
    width: '20%'
  },
  {
    name: 'Hora',
    selector: 'logTime',
    searcheable: true,
    sortable: true,
    width: '20%'
  },
  {
    name: 'Usuario',
    selector: 'usuario',
    searcheable: true,
    sortable: true,
    width: '20%'
  }

]