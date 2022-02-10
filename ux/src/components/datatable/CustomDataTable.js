// ** React Imports
import { Fragment, useState, useContext } from 'react'

import DataTable from 'react-data-table-component'
import { ChevronDown, FileText, Plus, Download, ArrowLeft, Filter, Layers } from 'react-feather'
import { Card, CardHeader, CardTitle, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Col } from 'reactstrap'
import { useHistory } from 'react-router'
import { AbilityContext } from '@src/utility/context/Can'

import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { downloadCSV } from './addons/DownloadCSV'
import { customStyles } from './addons/CustomStyles'
import CustomFilter from './addons/CustomFilter'
import { AdvancedFilter } from './addons/AdvancedFilter'
import { handleFullClean } from '../../utility/helpers/handleFullClean'

const noResult = <span style={{ margin: '2%', width: '50%', textAlign: 'center' }}>No se han encontrado resultados</span>
const sortIcon = <ChevronDown size={10} />
const messagePagination = { rowsPerPageText: 'Registros por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' }
const limit = [10, 25, 50, 100, 250]

export const CustomDataTable = (props) => {

  const history = useHistory()
  const ability = useContext(AbilityContext)

  const { title, addButton = true, backButton = false, columns, data = [], filters } = props

  // ** States
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchGlobalValue, setGlobalSearchValue] = useState('')
  const [searchColumnValue, setColumnValue] = useState({})
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const { endPoint } = useSelector(state => state.registrosReducer)

  const capitalizeFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1)
  const can = endPoint ? capitalizeFirstLetter(endPoint) : null

  const realData = Object.keys(searchColumnValue).length === 0 && searchGlobalValue.length === 0 ? data : filteredData

  if (isButtonClicked) {
    handleFullClean(dispatch)
    setIsButtonClicked(false)
  }

  const updateFilterData = (columnFilter, globalFilter, isSelect) => {

    if (isSelect) {
      const updateData = data
        .filter(dataItem => Object
          .keys(columnFilter)
          .every(FilterKey => columnFilter[FilterKey].every(value => String(dataItem[FilterKey]).toLowerCase().startsWith(value))))
        .filter(dataItem => Object
          .keys(dataItem)
          .some(FilterKey => String(dataItem[FilterKey]).toLowerCase().includes(globalFilter.toLowerCase()))
        )

      setFilteredData(updateData)
    } else {
      const updateData = data
        .filter(dataItem => Object
          .keys(columnFilter)
          .every(FilterKey => columnFilter[FilterKey].every(value => String(dataItem[FilterKey]).toLowerCase().indexOf(value.toLowerCase()) !== -1)))
        .filter(dataItem => Object
          .keys(dataItem)
          .some(FilterKey => String(dataItem[FilterKey]).toLowerCase().includes(globalFilter.toLowerCase()))
        )

      setFilteredData(updateData)
    }
  }


  const refreshFilters = () => {
    setShowFilters(!showFilters)
    setColumnValue({})
    updateFilterData({}, searchGlobalValue)
  }

  const refreshAdvancedFilters = () => {
    setShowAdvanced(!showAdvanced)
  }

  // ** Function to handle filter
  const handleFilter = (id, values, isSelect = false) => {
    const updateGlobalFilter = (id === 'globalFilter')

    const globalFilter = updateGlobalFilter ? values : searchGlobalValue
    const columnFilter = updateGlobalFilter ? searchColumnValue : { ...searchColumnValue, [id]: values }

    if (!updateGlobalFilter) values = values.filter(value => value.length !== 0)
    if (!updateGlobalFilter && values.length === 0) delete columnFilter[id]

    setColumnValue(columnFilter)
    setGlobalSearchValue(globalFilter)
    setCurrentPage(0)
    updateFilterData(columnFilter, globalFilter, isSelect)

  }

  return (
    <Fragment>
      <Card>
        {
          (filters && showAdvanced) && (<AdvancedFilter endPoint={endPoint} title={title} filters={filters} />)
        }
      </Card>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <Col>
            <CardTitle tag='h4' className="pl-0">{title}</CardTitle>
          </Col>
          <Col style={{ textAlign: 'right', display: ' contents' }}>
            {filters &&
              (<Button className='mr-1 border' outline={!showAdvanced} color={showAdvanced ? 'primary' : ''} onClick={refreshAdvancedFilters}>
                <Layers className='p-0' size={12} />
              </Button>)
            }
            <Button className='mr-1 border btn btn-xs' outline={!showFilters} color={showFilters ? 'primary' : ''} onClick={refreshFilters}>
              <Filter size={12} />
            </Button>
            <Input className='dataTable-filter mr-2' type='text' placeholder='Buscar' bsSize='xl' onChange={(e) => handleFilter('globalFilter', e.target.value)} style={{ maxWidth: '20%' }} />
            <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' outline>
                <Download size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='w-100' onClick={() => downloadCSV(title, realData)}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>CSV</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            {
              backButton && (
                <Link to='#' onClick={() => { history.goBack() }}>
                  <Button className='ml-2' color='secondary' outline>
                    <ArrowLeft size={15} />
                    <span className='align-middle ml-50'>Atrás</span>
                  </Button>
                </Link>
              )
            }
            {
              addButton && (can && ability.can('insert', can)) && (
                <Link to={`${useLocation().pathname}/add`}>
                  <Button className='ml-2' color='primary'>
                    <Plus size={15} />
                    <span className='align-middle ml-50'>Añadir {title}</span>
                  </Button>
                </Link>
              )
            }
          </Col>
        </CardHeader>
        <div style={{ display: 'flex', marginTop: '0.5%', marginBottom: '0.5%', height: '2.1rem' }}>
          <CustomFilter columns={columns} searchColumnValue={searchColumnValue} handleFilter={handleFilter} areFiltersActive={showFilters} />
        </div>
        <DataTable
          noHeader
          responsive
          pagination
          className='react-dataTable'
          customStyles={customStyles}
          sortIcon={sortIcon}
          noDataComponent={noResult}
          paginationPerPage={25}
          paginationDefaultPage={currentPage + 1}
          paginationComponentOptions={messagePagination}
          paginationRowsPerPageOptions={limit}
          columns={columns}
          data={realData}
        />
      </Card>
    </Fragment>
  )
}