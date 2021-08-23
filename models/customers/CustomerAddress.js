const Address = require("../Address");

class CustomerAddress extends Address{
    #table = 'customers_addresses'
    constructor(params) {
        super(params)
    }

    get table() {
        return this.#table;
    }
}
module.exports = CustomerAddress