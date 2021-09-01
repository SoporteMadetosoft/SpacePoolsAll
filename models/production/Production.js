class Production {
    #table = 'production'

    constructor({
        id,
        orderId,
        productionCode,
        status
    }) {
        this.id = id
        this.orderId = orderId
        this.productionCode = productionCode
        this.status = status
    }
    get table() {
        return this.#table;
    }
}
module.exports = Production