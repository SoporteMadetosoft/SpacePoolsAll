const PaymentMethod = require("../../../models/setup/general/PaymentMethods");
const SetupDao = require("../SetupDao");

class PaymentMethodDao extends SetupDao {
    constructor() {
        super(PaymentMethod)

    }

    mountObj(data) {
        const docs = {
            ...data
        }
        docs.isVendor = !!docs.isVendor
        return new PaymentMethod(docs)
    }
}
module.exports = PaymentMethodDao