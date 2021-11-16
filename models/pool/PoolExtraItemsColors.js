class PoolExtraItemsColors {
    #table = 'pool_itemcolors'

    constructor({ id, idPool, idItem,idColor, quantity }) {
        this.id = id
        this.idPool = idPool
        this.idItem = idItem
        this.idColor = idColor
        this.quantity = quantity
    }
    get table() {
        return this.#table;
    }
}
module.exports = PoolExtraItemsColors