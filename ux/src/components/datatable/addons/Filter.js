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