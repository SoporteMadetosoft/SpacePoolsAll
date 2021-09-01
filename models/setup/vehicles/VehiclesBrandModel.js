const Setup = require('../Setup')

class VehiclesBrandModel extends Setup {

    #table = 'setup_model'
    constructor(param) {
        super(param)
        this.idBrand = param.idBrand
    }

    get table() {
        return this.#table;
    }
};

module.exports = VehiclesBrandModel
