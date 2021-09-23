// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import classnames from 'classnames'
import { CardBody, Button, CustomInput } from 'reactstrap'

// ** Filters Checkbox Array
const filters = [
  { label: 'Producción', color: 'primary', className: 'custom-control-primary mb-1' },
  { label: 'Entrega', color: 'success', className: 'custom-control-success mb-1' }
]

const SidebarLeft = props => {
  // ** Props
  const { handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, store, dispatch } = props

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }

  return (
    <Fragment>
      <div className='sidebar-wrapper'>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Filtro</span>
          </h5>
          <CustomInput
            type='checkbox'
            className='mb-1'
            label='Ver todo'
            id='view-all'
            checked={store.selectedCalendars.length === filters.length}
            onChange={e => dispatch(updateAllFilters(e.target.checked))}
          />
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <CustomInput
                    type='checkbox'
                    key={filter.label}
                    id={filter.label}
                    label={filter.label}
                    checked={store.selectedCalendars.includes(filter.label)}
                    className={classnames({
                      [filter.className]: filter.className
                    })}
                    onChange={e => dispatch(updateFilter(filter.label))}
                  />
                )
              })}
          </div>
        </CardBody>
      </div>

    </Fragment>
  )
}

export default SidebarLeft
