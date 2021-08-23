const Setup = require('../Setup')

class VendorsType extends Setup {
    #table = 'setup_vendors_types'

    constructor(param) {
      super(param)

    }

    get table() {
        return this.#table;
    }
};

module.exports = VendorsType
