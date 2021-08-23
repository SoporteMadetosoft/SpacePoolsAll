class CustomerData{
    base ={}
    #table = 'orders_customer_data'

    constructor({
        id,
        orderId,
        deliveryAddress,
        phone,
        email
    }){
       this.base.id = id
       this.base.orderId = orderId
       this.base.deliveryAddress = deliveryAddress
       this.base.phone = phone
       this.base.email = email
    }
    get table() {
        return this.#table;
    }
}
module.exports = CustomerData