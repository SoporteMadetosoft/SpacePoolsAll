import Input from "reactstrap/lib/Input"

import '@styles/react/libs/react-select/_react-select.scss'
import './filter.css'
import { formatDateDMY } from "../../../../utility/helpers/formatDate"
import { Select } from "@components/form/Select"

export const CustomFilter = ({ columns, searchColumnValue, handleFilter, areFiltersActive }) => {

    const isSelect = true

    if (areFiltersActive) {
        const filters = []
        columns.forEach(col => {
            if (col.select) {
                const styles = {
                    control: (provided) => ({
                        ...provided,
                        fontSize: '7.5pt',
                        maxHeight: '1.8rem',
                        minHeight: '0rem'
                    }),
                    options: (provided) => ({
                        ...provided,
                        fontSize: '7pt'
                    }),
                    indicatorContainer: (provided) => ({
                        ...provided,
                        padding: '0rem 0rem .5rem 0rem'
                    })
                }

                filters.push(
                    <td key={`${col.selector}`} style={{ width: col.width, padding: '0rem 0rem 0rem 1rem', height: '2.7rem' }}>
                        {col.searchable && <Select styles={styles} hasLabel={false} placeholder={col.name} endPoint={col.select} onSelect={(e) => handleFilter(col.selector, e === null ? [''] : [e.value], isSelect)} />}
                    </td>)

            } else if (col.time) {
                const filterTime = searchColumnValue[col.selector] === undefined ? ['', ''] : searchColumnValue[col.selector]
                filters.push(
                    <td key={`${col.selector}`} style={{ width: col.width, padding: '0rem 0rem 0rem 1rem', height: '2.7rem', display: 'flex' }}>
                        {col.searchable &&
                            (<>
                                <Input type='time' className="littlePlaceHolder" style={{ height: '65%' }} onChange={(e) => handleFilter(col.selector, [e.target.value.length === 0 ? '' : `${e.target.value} -`, filterTime[1]])} />
                                <Input className='ml-1' className="littlePlaceHolder ml-1" style={{ height: '65%' }} type='time' onChange={(e) => handleFilter(col.selector, [filterTime[0], e.target.value.length === 0 ? '' : `- ${e.target.value}`])} />
                            </>)
                        }
                    </td>)

            } else if (col.singletime) {
                const filterTime = searchColumnValue[col.selector] === undefined ? ['', ''] : searchColumnValue[col.selector]
                filters.push(
                    <td style={{ width: col.width, padding: '0rem 0rem 0rem 1rem', height: '2.7rem', display: 'flex' }}>
                        {col.searchable && <Input type='time' className="littlePlaceHolder" style={{ height: '65%' }} onChange={(e) => handleFilter(col.selector, [e.target.value.length === 0 ? '' : `${e.target.value}`, filterTime[1]])} />}
                    </td>)

            } else if (col.date) {
                filters.push(
                    <td style={{ width: col.width, padding: '0rem 0rem 0rem 1rem', height: '2.7rem', display: 'flex' }}>
                        {col.searchable && <Input type='date' className="littlePlaceHolder" style={{ height: '65%' }} onChange={(e) => {
                            const date = formatDateDMY(e.target.value)
                            handleFilter(col.selector, [e.target.value.length === 0 ? '' : `${date}`])
                        }} />
                        }
                    </td>)


            } else if (col.hiddenFilter) {
                filters.push(
                    <td key={`${col.selector}`} style={{ width: col.width, padding: '0rem 0rem 0rem 1rem', height: '2.7rem' }} />)
            } else {
                filters.push(
                    <td key={`${col.selector}`} style={{ width: col.width, padding: '0rem 0rem 0rem 1rem', height: '2.7rem' }}>
                        {col.searchable && <Input type='text' className="littlePlaceHolder" style={{ height: '65%' }} placeholder={col.name} onChange={(e) => handleFilter(col.selector, [e.target.value])} />}
                    </td>)
            }
        })

        delete filters[filters.length - 1]
        return (
            <table style={{ display: 'contents', width: '100%' }}>
                <tr style={{ width: '90%', paddingLeft: '10px', display: 'contents' }}>{filters}</tr>
            </table>
        )
    }

    return (<div style={{ width: '90%' }} />)

}

export default CustomFilter
