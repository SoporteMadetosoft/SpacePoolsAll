export const datetimeToEuropeDate = (date) => {
    if (date !== null) {
        let month = date.getMonth() + 1
        const year = date.getFullYear()
        month = month >= 10 ? month : `0${month}`
        let dt = date.getDate()
        dt = dt >= 10 ? dt : `0${dt}`
        return (`${dt}/${month}/${year}`)
    }
}