class Repair {
    #table = 'trailer_repair'

    constructor({
        id,
        idTrailer,
        date,
        description,
        garage,
        cost
    }) {
        this.id = id
        this.idTrailer = idTrailer
        this.date = date
        this.description = description
        this.garage = garage
        this.cost = cost
    }
    get table() {
        return this.#table;
    }
}
module.exports = Repair