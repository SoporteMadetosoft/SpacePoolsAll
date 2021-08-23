const CustomerCategory = require("../../../models/setup/customer/CustomerCategory");
const SetupDao = require("../SetupDao");


class CustomerCategoryDao extends SetupDao{
    constructor() {
        super(CustomerCategory)
    }
}
module.exports= CustomerCategoryDao