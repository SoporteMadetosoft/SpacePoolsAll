class Order {
    extraItems = []
    customerData = []
    production = []
    baseItems = []
    #table = 'orders'

    constructor({
        id,
        customerId,
        idPool,
        orderCode,
        orderDate,
        deliveryDate,
        deliverySchedulerStart,
        deliverySchedulerEnd,
        observations,
        price,
        idTax,
        extraItems = [],
        customerData = [],
        production = [],
        baseItems = []
    }) {
        this.id = id
        this.customerId = customerId
        this.idPool = idPool
        this.orderCode = orderCode
        this.orderDate = orderDate
        this.deliveryDate = deliveryDate
        this.deliverySchedulerStart = deliverySchedulerStart
        this.deliverySchedulerEnd = deliverySchedulerEnd
        this.observations = observations
        this.price = price
        this.idTax = idTax 
        this.extraItems = extraItems
        this.customerData = customerData
        this.production = production
        this.baseItems = baseItems
    }
    get table() {
        return this.#table;
    }
}
module.exports = Order