const PaymentMethods = require("../../../models/setup/general/PaymentMethods");
const PaymentMethod = require("../../../models/setup/general/PaymentMethods");
const SetupDao = require("../SetupDao");

class PaymentMethodDao extends SetupDao {
    constructor() {
        super(PaymentMethod)
    }
}
module.exports = PaymentMethodDao