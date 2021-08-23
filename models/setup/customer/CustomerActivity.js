const Setup = require('../Setup')

class CustomerActivity extends Setup {
    #table = 'setup_activity'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }

};

module.exports = CustomerActivity