class Purchase {
    base = {}
    items = []
    #table  = 'purchases'

    constructor({
        id,
        vendorId,
        purchaseCode,
        purchaseDate,
        deliveryDate,
        observations,
        items = []
    }){
        this.base.id = id
        this.base.vendorId = vendorId
        this.base.purchaseCode = purchaseCode
        this.base.purchaseDate = purchaseDate
        this.base.deliveryDate = deliveryDate
        this.base.observations = observations
        this.items = items
    }
    get table() {
        return this.#table;
    }
}
module.exports = Purchase