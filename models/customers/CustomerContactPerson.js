const ContactPerson = require('../ContactPerson')

class CustomerContactPersons extends ContactPerson {
    #table = 'customers_contact'
    constructor(params) {
        super(params)
    }

    get table() {
        return this.#table;
    }
};
module.exports = CustomerContactPersons