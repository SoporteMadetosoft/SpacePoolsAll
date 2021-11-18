class PoolExtraItems {
    #table = 'pool_items'

    constructor({ id, idPool, idItem, quantity }) {
        this.id = id
        this.idPool = idPool
        this.idItem = idItem
        this.quantity = quantity
    }
    get table() {
        return this.#table;
    }
}
module.exports = PoolExtraItems