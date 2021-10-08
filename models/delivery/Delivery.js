class Delivery {
    #table = 'delivery'

    constructor({
        idOrder,
        Customer,
        gps,
        deliveryStart,
        deliveryEnd,
        idStatus
    }) {
        this.idOrder = idOrder
        this.Customer = Customer
        this.gps = gps
        this.deliveryStart = deliveryStart
        this.deliveryEnd = deliveryEnd
        this.idStatus = idStatus
    }
    get table() {
        return this.#table;
    }
}
module.exports = Delivery