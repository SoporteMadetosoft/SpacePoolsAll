const Setup = require('../Setup')

class VehiclesBrand extends Setup {
    #table = 'setup_brand'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = VehiclesBrand
