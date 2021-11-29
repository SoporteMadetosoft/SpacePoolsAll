const ContactPerson = require("../ContactPerson")

class VendorContact extends ContactPerson{
    #table = 'vendors_contact'

    constructor(params) {
        super(params)
    }

    get table() {
        return this.#table;
    }
}
module.exports = VendorContact