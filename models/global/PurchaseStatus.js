const Setup = require('../setup/Setup')

class PurchaseStatus extends Setup {
    #table = 'global_purchase_status'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = PurchaseStatus
