const Setup = require('../Setup')

class AddressType extends Setup {
    #table ='setup_addresses_types'

    constructor(params){
        super(params)
    }
    
    get table() {
        return this.#table;
    }
};
module.exports = AddressType