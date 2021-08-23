const Setup = require('../Setup')

class CustomerCategory extends Setup {
    #table = 'setup_customer_category'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = CustomerCategory