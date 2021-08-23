const Setup = require('../setup/Setup')

class Status extends Setup {
    #table = 'setup_status'
    constructor(param) {
       super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Status
