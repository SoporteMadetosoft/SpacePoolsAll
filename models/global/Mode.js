const Setup = require('../setup/Setup')

class Mode extends Setup {
    #table = 'global_mode'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Mode
