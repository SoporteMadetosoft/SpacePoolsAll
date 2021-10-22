class Item {
    #table = 'purchases_items'

    constructor({
        id,
        idPurchase,
        idItem,
        idColor,
        quantity,
        recived
    }) {
        this.id = id
        this.idPurchase = idPurchase
        this.idItem = idItem
        this.idColor = idColor
        this.quantity = quantity
        this.recived = recived
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item