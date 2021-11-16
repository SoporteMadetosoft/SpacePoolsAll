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
        idColor,
        extraItems = [],
        extraItemColors = [],
        extraRaws = [],
        extraRawColors = [],
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
        this.idColor = idColor
        this.extraItems = extraItems
        this.extraItemColors = extraItemColors
        this.extraRaws = extraRaws
        this.extraRawColors = extraRawColors
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