const CustomerActivity = require("../../../models/setup/customer/CustomerActivity");
const SetupDao = require("../SetupDao");


class CustomerActivityDao extends SetupDao{
    constructor() {
        super(CustomerActivity)
    }
}
module.exports= CustomerActivityDao