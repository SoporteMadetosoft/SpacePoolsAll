class PoolItems {
    #table = 'pool_items'

    id
    idPool
    idItem
    cantidad
    constructor({ id, idPool, idItem, cantidad }) {
        this.id = id
        this.idPool = idPool
        this.idItem = idItem
        this.cantidad = cantidad
    }
    get table() {
        return this.#table;
    }
}
module.exports = PoolItems