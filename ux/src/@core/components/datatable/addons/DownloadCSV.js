
// ** Converts table to CSV
const convertArrayOfObjectsToCSV = (array) => {
    console.log(array)
    let result
    if (array.length > 0) {
        const columnDelimiter = ','
        const lineDelimiter = '\n'
        const keys = Object.keys(array[0])

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
}

// ** Downloads CSV
export const downloadCSV = (title, array) => {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null || csv === undefined) return

    const filename = `${title}.csv`

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
}