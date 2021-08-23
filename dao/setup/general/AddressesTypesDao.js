const AddressType = require("../../../models/setup/general/AddressType");
const SetupDao = require("../SetupDao");

class AddressTypesDao extends SetupDao{
    
    constructor() {
        super(AddressType)
    }
}
module.exports = AddressTypesDao