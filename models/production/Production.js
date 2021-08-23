class Production{
    base = {}
    #table = 'production'

    constructor({
        id,
        orderId,
        productionCode,
        status
    }){
        this.base.id = id
        this.base.orderId = orderId
        this.base.productionCode = productionCode
        this.base.status = status
    }
    get table() {
        return this.#table;
    }
}
module.exports = Production