const Setup = require('../setup/Setup')

class ProductionStatus extends Setup {
    #table = 'global_production_status'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = ProductionStatus
