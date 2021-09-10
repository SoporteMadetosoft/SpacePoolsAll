const Documents = require("../Documents")

class CustomerDocuments extends Documents {
    #table = 'customers_documents'
    constructor(params) {
        super(params)
    }

    get table() {
        return this.#table;
    }
}
module.exports = CustomerDocuments