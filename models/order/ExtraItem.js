class ExtraItem {
    #table = 'orders_extra_items'

    constructor({
        id,
        idOrder,
        idItem,
        posX,
        posY
    }) {
        this.id = id
        this.idOrder = idOrder
        this.idItem = idItem
        this.posX = posX
        this.posY = posY
    }
    get table() {
        return this.#table;
    }
}
module.exports = ExtraItem