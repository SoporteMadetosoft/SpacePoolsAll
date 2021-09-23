class Calendar {
    #table = 'events'

    constructor({
        id,
        url,
        title,
        start,
        end,
        allDay,
        calendar
    }) {
        this.id = id
        this.url = url
        this.title = title
        this.start = start
        this.end = end
        this.allDay = allDay
        this.calendar = calendar
    }
    get table() {
        return this.#table;
    }
}
module.exports = Calendar