const PurchaseStatus = require("../../models/global/PurchaseStatus");
const SetupDao = require("../setup/SetupDao");

class PurchaseStatusDao extends SetupDao {

    constructor() {
        super(PurchaseStatus)
    }
}
module.exports = PurchaseStatusDao