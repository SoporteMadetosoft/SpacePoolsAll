const Setup = require('../setup/Setup')

class Language extends Setup {
    #table = 'global_language'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Language
