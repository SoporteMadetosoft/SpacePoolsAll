const Setup = require('../setup/Setup')

class Language extends Setup {
    #table = 'setup_language'
    constructor(param) {
       super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Language
