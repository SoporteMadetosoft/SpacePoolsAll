const Setup = require('../Setup')

class Taxes extends Setup {
    #table = 'setup_taxes'

    constructor(params) {
        super(params)
        this.value = params.value
    }

    get table() {
        return this.#table;
    }
};
module.exports = Taxes