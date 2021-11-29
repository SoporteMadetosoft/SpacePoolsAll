import { FileText, MoreVertical, Trash } from "react-feather"
import { useDispatch } from "react-redux"
import DropdownItem from "reactstrap/lib/DropdownItem"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown"
import { startDeleteRegister } from "@redux/actions/custom"
import { Link } from "react-router-dom"

import { useContext } from "react"
import { AbilityContext } from '@src/utility/context/Can'

export const vendorTypeList = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
    searchable: true,
    minWidth: '50px',
    width: '8%'
  },
  {
    name: 'Tipo de proveedor',
    selector: 'name',
    sortable: true,
    searchable: true,
    width: '87%'
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
              {ability.can('update', 'vendorType') && (
                <Link to={`./vendorType/edit/${row.id}`}>
                  <DropdownItem tag='a' href='/' className='w-100'>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>Detalles</span>
                  </DropdownItem>
                </Link>
              )}
              {ability.can('delete', 'vendorType') && (
                <DropdownItem tag='a' href='/' className='w-100' onClick={(e) => {
                  e.preventDefault()
                  dispatch(startDeleteRegister(row.id))
                }}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Eliminar</span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]