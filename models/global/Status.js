const Setup = require('../setup/Setup')

class Status extends Setup {
    #table = 'global_status'
    constructor(param) {
       super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Status
