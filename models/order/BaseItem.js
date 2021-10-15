class BaseItem {
    #table = 'orders_base_items'

    constructor({
        id,
        idOrder,
        idItem,
        idColor,
        quantity
    }) {
        this.id = id
        this.idOrder = idOrder
        this.idItem = idItem
        this.idColor = idColor
        this.quantity = quantity
    }
    get table() {
        return this.#table;
    }
}
module.exports = BaseItem