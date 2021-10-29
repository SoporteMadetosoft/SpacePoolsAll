// ** React Imports
import { Fragment, useState, forwardRef, useContext } from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, FileText, Plus, Download, ArrowLeft } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap'
import { useHistory } from 'react-router'
import { AbilityContext } from '@src/utility/context/Can'


import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))


export const CustomDataTable = ({ title, columns, data, add = 1, repa = '' }) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const history = useHistory()
  const ability = useContext(AbilityContext)


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1)
  }

  const { endPoint } = useSelector(state => state.registrosReducer)
  const can = endPoint !== null ? capitalizeFirstLetter(endPoint) : null

  const searchableColumns = () => {
    const columnas = []
    columns.forEach(column => {
      if (column.searchable === true) {
        columnas.push(`${column.selector}`)
      }
    })
    return { columnas }
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {

        const schCols = searchableColumns()

        let returned

        schCols.columnas.forEach(col => {
          const colValue = (item[col] !== null && item[col] !== undefined) ? item[col].toString() : ''
          const startsWith = colValue.toLowerCase().startsWith(value.toLowerCase())
          const includes = colValue.toLowerCase().includes(value.toLowerCase())
          if (startsWith || (!startsWith && includes)) {
            returned = item.toString()
          }
        })

        return returned
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }


  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 20 : data.length / 20 || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>{title}</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <Download size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='w-100' onClick={() => downloadCSV(searchValue.length ? (filteredData) : (data))}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>CSV</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            {
              repa !== '' ? (
                <Link to='#' onClick={() => { history.push(`${repa}`) }}>
                  <Button className='ml-2' color='secondary' outline>
                    <ArrowLeft size={15} />
                    <span className='align-middle ml-50'>Atrás</span>
                  </Button>
                </Link>
              ) : null
            }
            {

              add === 1 && (can && ability.can('insert', can)) ? (
                <Link to={`${useLocation().pathname}/add`}>
                  <Button className='ml-2' color='primary'>
                    <Plus size={15} />
                    <span className='align-middle ml-50'>Añadir {title}</span>
                  </Button>
                </Link>
              ) : null
            }

          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Buscar
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          responsive
          // selectableRows
          noDataComponent={<span>No hay registros para mostrar</span>}
          columns={columns}
          paginationPerPage={20}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
    </Fragment>
  )
}