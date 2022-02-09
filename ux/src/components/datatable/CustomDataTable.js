// ** React Imports
import { Fragment, useState, useContext } from 'react'

import DataTable from 'react-data-table-component'
import { ChevronDown, FileText, Plus, Download, ArrowLeft, Filter, Layers, XCircle } from 'react-feather'
import { Card, CardHeader, CardTitle, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Row, Col } from 'reactstrap'
import { useHistory } from 'react-router'
import { AbilityContext } from '@src/utility/context/Can'


import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { downloadCSV } from './addons/DownloadCSV'
import { customStyles } from './addons/CustomStyles'
import CustomFilter from './addons/CustomFilter'
import { AdvancedFilter } from './addons/AdvancedFilter'

export const CustomDataTable = ({ title, columns, data = [], filters, addButton = true, backButton = false }) => {

  const history = useHistory()
  const ability = useContext(AbilityContext)

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


  const searchableColumns = () => {
    const columnas = []
    columns.forEach(column => {
      if (column.searchable === true) columnas.push(`${column.selector}`)
    })
    return { columnas }
  }

  // ** Function to handle filter
  const handleFilter = (id, values, isSelect = false) => {
    // TODO: Implementar columnas no filtrables
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
  // const handleFilter = e => {
  //   const value = e.target.value
  //   let updatedData = []

  //   if (value.length) {
  //     updatedData = data.filter(item => {

  //       const schCols = searchableColumns()

  //       let returned

  //       schCols.columnas.forEach(col => {
  //         const colValue = (item[col] !== null && item[col] !== undefined) ? item[col].toString() : ''
  //         const startsWith = colValue.toLowerCase().startsWith(value.toLowerCase())
  //         const includes = colValue.toLowerCase().includes(value.toLowerCase())
  //         if (startsWith || (!startsWith && includes)) {
  //           returned = item.toString()
  //         }
  //       })

  //       return returned
  //     })
  //   }

  //   setFilteredData(updatedData)
  //   setSearchValue(value)
  // }

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
                <DropdownItem className='w-100' onClick={() => downloadCSV(title, Object.keys(searchColumnValue).length === 0 && searchGlobalValue.length === 0 ? data : filteredData)}>
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
          pagination
          responsive
          customStyles={customStyles}
          // selectableRows
          noDataComponent={<span style={{ margin: '2%', width: '50%', textAlign: 'center' }}>No se han encontrado resultados</span>}
          columns={columns}
          paginationPerPage={25}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponentOptions={{ rowsPerPageText: 'Registros por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' }}
          paginationRowsPerPageOptions={[10, 25, 50, 100, 250]}
          data={Object.keys(searchColumnValue).length === 0 && searchGlobalValue.length === 0 ? data : filteredData}
        />
      </Card>
    </Fragment>
  )
}