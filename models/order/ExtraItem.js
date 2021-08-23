class ExtraItem{
    base = {}
    #table = 'orders_extra_items'

    constructor({
        id,
        orderId,
        itemId,
        posX,
        posY
    }){
        this.base.id = id
        this.base.orderId = orderId
        this.base.itemId = itemId
        this.base.posX = posX
        this.base.posY = posY
    }
    get table() {
        return this.#table;
    }
}
module.exports = ExtraItem