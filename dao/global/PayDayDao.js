const PayDay = require("../../models/global/PayDay");
const SetupDao = require("../setup/SetupDao");

class PayDayDao extends SetupDao{
    
    constructor() {
        super(PayDay)
    }
}
module.exports = PayDayDao