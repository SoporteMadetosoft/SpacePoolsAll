const Setup = require('../setup/Setup')

class Mode extends Setup {
    #table = 'setup_mode'
    constructor(param) {
       super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Mode
