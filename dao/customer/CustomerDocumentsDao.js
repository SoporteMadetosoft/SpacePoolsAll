const CustomerDocuments = require("../../models/customers/CustomerDocuments");
const DocumentsDao = require("../DocumentsDao");

class CarrierDocumentsDao extends DocumentsDao {
    constructor() {
        super(CustomerDocuments)
    }

    async mountObj(data) {
        return new CustomerDocuments(data)
    }

}
module.exports = CarrierDocumentsDao