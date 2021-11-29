const ProductionStatus = require("../../models/global/ProductionStatus");
const SetupDao = require("../setup/SetupDao");

class ProductionStatusDao extends SetupDao{
    
    constructor() {
        super(ProductionStatus)
    }
}
module.exports = ProductionStatusDao