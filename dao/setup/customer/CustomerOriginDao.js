const CustomerOrigin = require("../../../models/setup/customer/CustomerOrigin");
const SetupDao = require("../SetupDao");


class CustomerOriginDao extends SetupDao{
    constructor() {
        super(CustomerOrigin)
    }
}
module.exports= CustomerOriginDao