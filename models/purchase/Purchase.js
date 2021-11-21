class Purchase {
    items = []
    itemColors = []
    #table = 'purchases'

    constructor({
        id,
        idVendor,
        idStatus,
        purchaseCode,
        purchaseDate,
        deliveryDate,
        observations,
        items = [],
        itemColors = []
    }) {
        this.id = id
        this.idVendor = idVendor
        this.idStatus = idStatus
        this.purchaseCode = purchaseCode
        this.purchaseDate = purchaseDate
        this.deliveryDate = deliveryDate
        this.observations = observations
        this.items = items
        this.itemColors = itemColors
    }
    get table() {
        return this.#table;
    }
}
module.exports = Purchase