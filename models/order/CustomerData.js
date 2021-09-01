class CustomerData {
    #table = 'orders_customer_data'

    constructor({
        id,
        orderId,
        deliveryAddress,
        phone,
        email
    }) {
        this.id = id
        this.orderId = orderId
        this.deliveryAddress = deliveryAddress
        this.phone = phone
        this.email = email
    }
    get table() {
        return this.#table;
    }
}
module.exports = CustomerData