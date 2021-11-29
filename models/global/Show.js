const Setup = require('../setup/Setup')

class Show extends Setup {
    #table = 'global_show'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Show
