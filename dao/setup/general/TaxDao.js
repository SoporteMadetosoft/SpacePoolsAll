const Tax = require("../../../models/setup/general/Tax");
const SetupDao = require("../SetupDao");

class TaxDao extends SetupDao {
    constructor() {
        super(Tax)

    }

    mountObj(data) {
        const docs = {
            ...data
        }
        return new Tax(docs)
    }


}
module.exports = TaxDao