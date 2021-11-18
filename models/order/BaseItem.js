class BaseItem {
    #table = 'orders_base_items'

    constructor({
        id,
        idOrder,
        idItem,
        quantity
    }) {
        this.id = id
        this.idOrder = idOrder
        this.idItem = idItem
        this.quantity = quantity
    }
    get table() {
        return this.#table;
    }
}
module.exports = BaseItem