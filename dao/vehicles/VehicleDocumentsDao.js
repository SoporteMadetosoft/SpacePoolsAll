const dbCon = require("../Connection");
const VehicleDocuments = require("../../models/vehicles/VehicleDocuments");
const DocumentsDao = require("../DocumentsDao");


class VehicleDocumentsDao extends DocumentsDao {
    db=dbCon
    constructor() {
        super(VehicleDocuments)
    }

    async mountObj(data) {
        const documents = {
            ...data,
            expiration: this.datetimeToDate(data.expiration)
        }
        return new VehicleDocuments(documents)
    }

    

    

}
module.exports = VehicleDocumentsDao