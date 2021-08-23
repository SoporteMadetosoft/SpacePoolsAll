const CustomerType = require("../../../models/setup/customer/CustomerType");
const SetupDao = require("../SetupDao");


class CustomerTypeDao extends SetupDao{
    constructor() {
        super(CustomerType)
    }
}
module.exports= CustomerTypeDao