const Setup = require('../setup/Setup')

class PayDay extends Setup {
    #table = 'global_payDay'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = PayDay
