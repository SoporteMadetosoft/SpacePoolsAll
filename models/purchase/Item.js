class Item {
    #table = 'purchases_items'

    constructor({
        id,
        purchaseId,
        itemId,
        quantity
    }) {
        this.id = id
        this.purchaseId = purchaseId
        this.itemId = itemId
        this.quantity = quantity
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item