class Role {
    users = []
    #table = 'role'

    constructor({
        id,
        name,
        customers,
        vendors,
        carriers,
        vehicles,
        trailer,
        items,
        productfamily,
        pool,
        repair
    }) {
        this.id = id
        this.name = name
        this.customers = customers
        this.vendors = vendors
        this.carriers = carriers
        this.vehicles = vehicles
        this.trailer = trailer
        this.items = items
        this.productfamily = productfamily
        this.pool = pool
        this.repair = repair
    }
    get table() {
        return this.#table;
    }
}
module.exports = Role