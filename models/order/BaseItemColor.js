class BaseItemColor {
    #table = 'orders_base_item_colors'

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
module.exports = BaseItemColor