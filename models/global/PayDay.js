const Setup = require('../setup/Setup')

class PayDay extends Setup {
    #table = 'setup_payDay'
    constructor(param) {
       super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = PayDay
