class Production {
    #table = 'production'

    constructor({
        id,
        idOrder,
        productionCode,
        idProductionStatus,
        isStarted
    }) {
        this.id = id
        this.idOrder = idOrder
       // this.productionCode = productionCode
       // this.status = status
        this.idProductionStatus = idProductionStatus
        this.productionCode = productionCode,
        this.isStarted = isStarted
    }
    get table() {
        return this.#table;
    }
}
module.exports = Production