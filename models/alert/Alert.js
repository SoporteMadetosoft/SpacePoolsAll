class Alert {
    #table = 'alert'

    constructor({
        id,
        message,
        date,
        isDone
    }) {
        this.id = id
        this.message = message
        this.date = date
        this.isDone = isDone


    }

    get table() {
        return this.#table
    }


}

module.exports = Alert