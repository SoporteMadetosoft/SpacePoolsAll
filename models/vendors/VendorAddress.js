const Address = require("../Address");

class VendorAddress extends Address{
    #table = 'vendors_addresses'

    constructor(params) {
        super(params)
    }
    get table() {
        return this.#table;
    }
}
module.exports = VendorAddress