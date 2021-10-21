class Order {
    extraItems = []
    extraRaws = []
    customerData = []
    production = []
    baseItems = []
    #table = 'orders'

    constructor({
        id,
        idCustomer,
        idPool,
        orderDate,
        productionDate,
        deliveryDate,
        deliverySchedulerStart,
        deliverySchedulerEnd,
        observations,
        price,
        idTax,
        extraItems = [],
        extraRaws = [],
        customerData = [],
        production = [],
        baseItems = [],
        canvasItems = [],
    }) {
        this.id = id
        this.idCustomer = idCustomer
        this.idPool = idPool
        this.orderDate = orderDate
        this.productionDate = productionDate
        this.deliveryDate = deliveryDate
        this.deliverySchedulerStart = deliverySchedulerStart
        this.deliverySchedulerEnd = deliverySchedulerEnd
        this.observations = observations
        this.price = price
        this.idTax = idTax
        this.extraItems = extraItems
        this.extraRaws = extraRaws
        this.customerData = customerData
        this.production = production
        this.baseItems = baseItems
        this.canvasItems = canvasItems
    }
    get table() {
        return this.#table;
    }
}
module.exports = Order