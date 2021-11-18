class ExtraItemColor {
    #table = 'orders_extra_item_colors'

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
module.exports = ExtraItemColor