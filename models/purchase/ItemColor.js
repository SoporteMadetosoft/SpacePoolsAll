class ItemColor {
    #table = 'purchases_item_colors'

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
module.exports = ItemColor