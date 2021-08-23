const Setup = require('../Setup')


class CustomerOrigin extends Setup {
    #table = 'setup_origin'
    constructor({ id, name }) {
        super({ id, name })
        
    }
    get table() {
        return this.#table;
    }
};

module.exports = CustomerOrigin