class Repair {
    #table = 'vehicle_repair'

    constructor({
        id,
        idVehicle,
        date,
        description,
        garage,
        cost
    }) {
        this.id = id
        this.idVehicle = idVehicle
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