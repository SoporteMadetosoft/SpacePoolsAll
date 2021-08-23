class Role{
    base = {}
    users = []
    #table = 'users'

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
    }){
        this.base.id = id
        this.base.name = name
        this.base.customers = customers
        this.base.vendors = vendors
        this.base.carriers = carriers
        this.base.vehicles = vehicles
        this.base.trailer = trailer
        this.base.items = items
        this.base.productfamily = productfamily
        this.base.pool = pool
        this.base.repair = repair
    }
    get table() {
        return this.#table;
    }
}
module.exports = Role