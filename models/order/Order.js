class Order{
    base = {}
    extraItems = []
    customerData = []
    production = []
    #table = 'orders'

    constructor({
        id,
        customerId,
        poolId,
        orderCode,
        orderDate,
        deliveryDate,
        deliverySchedulerStart,
        deliverySchedulerEnd,
        observations,
        extraItems = [],
        customerData = [],
        production = []
    }){
        this.base.id = id
        this.base.customerId = customerId
        this.base.poolId = poolId
        this.base.orderCode = orderCode
        this.base.orderDate = orderDate
        this.base.deliveryDate = deliveryDate
        this.base.deliverySchedulerStart = deliverySchedulerStart
        this.base.deliverySchedulerEnd = deliverySchedulerEnd
        this.base.observations = observations
        this.extraItems =extraItems
        this.customerData = customerData
        this.production = production
    }
    get table() {
        return this.#table;
    }
}
module.exports = Order