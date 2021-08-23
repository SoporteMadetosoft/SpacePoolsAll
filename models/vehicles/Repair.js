class Repair{
    base = {}
    #table = 'vehicle_repair'

    constructor({
        id,
        vehicleId,
        date,
        description,
        garage,
        cost
    }){
        this.base.id = id
        this.base.vehicleId = vehicleId
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