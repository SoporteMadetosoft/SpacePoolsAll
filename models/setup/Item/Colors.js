const Setup = require('../Setup')

class Colors extends Setup {
    #table = 'setup_colors'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Colors
