const Setup = require('../Setup')

class CustomerType extends Setup {
    #table = 'setup_customer_type'
    constructor({ id, name }) {
        super({ id, name })
    }

    get table() {
        return this.#table;
    }
};

module.exports = CustomerType
