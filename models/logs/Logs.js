class Logs {
    #table = 'logs'

    constructor({
        id,
        message,
        logDate,
        logTime,
        idUser
    }) {
        this.id = id
        this.message = message
        this.logDate = logDate
        this.logTime = logTime
        this.idUser = idUser
    }
    get table() {
        return this.#table;
    }
}
module.exports = Logs