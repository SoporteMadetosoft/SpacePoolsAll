class Repair{
    base={}
    #table = 'trailer_repair'

    constructor({
        id,
        trailerId,
        date,
        description,
        garage,
        cost
    }){
        this.base.id = id
        this.base.trailerId = trailerId
        this.base.date = date
        this.base.description = description
        this.base.garage = garage
        this.base.cost = cost
    }
    get table() {
        return this.#table;
    }
}
module.exports = Repair