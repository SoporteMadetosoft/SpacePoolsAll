const Documents = require("../Documents")

class TrailerDocuments extends Documents {
    #table = 'trailer_documents'
    constructor(params) {
        super(params)
        this.expiration = params.expiration
    }

    get table() {
        return this.#table;
    }
}
module.exports = TrailerDocuments