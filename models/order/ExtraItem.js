class ExtraItem {
    #table = 'orders_extra_items'

    constructor({
        id,
        orderId,
        itemId,
        posX,
        posY
    }) {
        this.id = id
        this.orderId = orderId
        this.itemId = itemId
        this.posX = posX
        this.posY = posY
    }
    get table() {
        return this.#table;
    }
}
module.exports = ExtraItem