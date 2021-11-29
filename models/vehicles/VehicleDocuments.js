const Documents = require("../Documents")

class VehicleDocuments extends Documents {
    #table = 'vehicles_documents'
    constructor(params) {
        super(params)
        this.expiration = params.expiration
    }

    get table() {
        return this.#table;
    }
}
module.exports = VehicleDocuments