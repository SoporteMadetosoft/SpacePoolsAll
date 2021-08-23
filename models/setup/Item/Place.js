const Setup = require('../Setup')

class Place extends Setup {
    #table = 'setup_place'
    constructor(param) {
       super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = Place
