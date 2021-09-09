const CarrierDocuments = require("../../models/carrier/CarrierDocuments");
const DocumentsDao = require("../DocumentsDao");

class CarrierDocumentsDao extends DocumentsDao {
    constructor() {
        super(CarrierDocuments)
    }


    async mountObj(data) {
        return new CarrierDocuments(data)
    }

}
module.exports = CarrierDocumentsDao