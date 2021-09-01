class Purchase {
    items = []
    #table = 'purchases'

    constructor({
        id,
        idVendor,
        purchaseCode,
        purchaseDate,
        deliveryDate,
        observations,
        items = []
    }) {
        this.id = id
        this.idVendor = idVendor
        this.purchaseCode = purchaseCode
        this.purchaseDate = purchaseDate
        this.deliveryDate = deliveryDate
        this.observations = observations
        this.items = items
    }
    get table() {
        return this.#table;
    }
}
module.exports = Purchase