const formatTime = (date) => {
    if (date !== undefined) {
        date = new Date(date)
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const sec = date.getSeconds()
        date = `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}:${sec < 10 ? '0' : ''}${sec}`
    }
    return date
}

const reformatDate = (date) => {
    const newDate = new Date(date)
    if (!isNaN(newDate.getTime())) {
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
    }
}

module.exports = { formatTime, reformatDate }