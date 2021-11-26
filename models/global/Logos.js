const Setup = require('../setup/Setup')

class Logos extends Setup {
    #table = 'global_logos'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Logos
