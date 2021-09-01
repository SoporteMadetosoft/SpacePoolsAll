class Repair {
    #table = 'trailer_repair'

    constructor({
        id,
        trailerId,
        date,
        description,
        garage,
        cost
    }) {
        this.id = id
        this.trailerId = trailerId
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