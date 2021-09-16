class Production {
    #table = 'production'

    constructor({
        id,
        idOrder,
        productionCode,
        status
    }) {
        this.id = id
        this.idOrder = idOrder
        this.productionCode = productionCode
        this.status = status
    }
    get table() {
        return this.#table;
    }
}
module.exports = Production