class Item{
    base = {}
    #table = 'purchases_items'

    constructor({
        id,
        purchaseId,
        itemId,
        quantity
    }){
        this.base.id = id
        this.base.purchaseId = purchaseId
        this.base.itemId = itemId
        this.base.quantity = quantity
    }
    get table() {
        return this.#table;
    }
}
module.exports = Item