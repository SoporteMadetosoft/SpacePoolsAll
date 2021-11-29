const Setup = require('../setup/Setup')

class PayDay extends Setup {
    #table = 'global_payday'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = PayDay
