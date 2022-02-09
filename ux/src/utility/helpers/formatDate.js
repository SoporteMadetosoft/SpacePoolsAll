const { formatTime } = require("./formatTime")

const formatDateDMY = (date, separator = '-') => {

    if (date) {
        date = new Date(date)
        let month = date.getMonth() + 1
        const year = date.getFullYear()
        month = month >= 10 ? month : `0${month}`
        let dt = date.getDate()
        dt = dt >= 10 ? dt : `0${dt}`
        date = `${dt}${separator}${month}${separator}${year}`
        return date
    } else {
        return ''
    }
}

const formatDateYMD = (date, separator = '-') => {

    if (date) {
        date = new Date(date)
        let month = date.getMonth() + 1
        const year = date.getFullYear()
        month = month >= 10 ? month : `0${month}`
        let dt = date.getDate()
        dt = dt >= 10 ? dt : `0${dt}`
        date = `${year}${separator}${month}${separator}${dt}`
        return date
    } else {
        return ''
    }
}

const formatDateTime = (dateTime, format, separator = '-') => {
    if (dateTime) {
        const time = formatTime(dateTime)

        const formatedDate = format === 'YMD' ? formatDateYMD(dateTime, separator) : formatDateDMY(dateTime, separator)

        return `${formatedDate}   ${time}`
    } else {
        return ''
    }
}

module.exports = { formatDateDMY, formatDateYMD, formatDateTime }