const TrailerDocuments = require("../../models/trailer/TrailerDocuments");
const DocumentsDao = require("../DocumentsDao");

class TrailerDocumentsDao extends DocumentsDao {
    constructor() {
        super(TrailerDocuments)
    }

    async mountObj(data) {
        const documents = {
            ...data,
            expiration: this.datetimeToDate(data.expiration)
        }
        return new TrailerDocuments(documents)
    }

}
module.exports = TrailerDocumentsDao