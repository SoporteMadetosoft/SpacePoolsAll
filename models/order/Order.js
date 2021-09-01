class Order {
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
    }) {
        this.id = id
        this.customerId = customerId
        this.poolId = poolId
        this.orderCode = orderCode
        this.orderDate = orderDate
        this.deliveryDate = deliveryDate
        this.deliverySchedulerStart = deliverySchedulerStart
        this.deliverySchedulerEnd = deliverySchedulerEnd
        this.observations = observations
        this.extraItems = extraItems
        this.customerData = customerData
        this.production = production
    }
    get table() {
        return this.#table;
    }
}
module.exports = Order