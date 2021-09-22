class Item {
    #table = 'purchases_items'

    constructor({
        id,
        idPurchase,
        idItem,
        quantity
    }) {
        this.id = id
        this.idPurchase = idPurchase
        this.idItem = idItem
        this.quantity = quantity
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item