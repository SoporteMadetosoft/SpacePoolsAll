const Setup = require('../setup/Setup')

class ItemType extends Setup {
    #table = 'global_item_type'
    constructor(param) {
        super(param)
    }

    get table() {
        return this.#table;
    }
};

module.exports = ItemType
