
export const dateTimeNow = (tipo) => {
    const date = new Date()
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
    const month = date.getMonth() >= 10 ? date.getMonth() : `0${date.getMonth()}`
    const year = date.getFullYear()

    const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
    const seconds = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`

    return tipo === 'date' ? (`${year}-${month}-${day}`)
        : tipo === 'time' ? (`${hour}:${minutes}:${seconds}`)
            : tipo === 'datetime' ? (`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`)
                : ''
}