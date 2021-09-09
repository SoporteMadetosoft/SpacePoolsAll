const Documents = require("../Documents")

class CarrierDocuments extends Documents {
    #table = 'carriers_documents'
    constructor(params) {
        super(params)
    }

    get table() {
        return this.#table;
    }
}
module.exports = CarrierDocuments