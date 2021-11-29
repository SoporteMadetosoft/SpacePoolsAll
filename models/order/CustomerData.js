class CustomerData {
    #table = 'orders_customer_data'

    constructor({
        id,
        idOrder,
        deliveryAddress,
        phone,
        email
    }) {
        this.id = id
        this.idOrder = idOrder
        this.deliveryAddress = deliveryAddress
        this.phone = phone
        this.email = email
    }
    get table() {
        return this.#table;
    }
}
module.exports = CustomerData