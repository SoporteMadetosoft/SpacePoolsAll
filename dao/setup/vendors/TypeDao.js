const Type = require("../../../models/setup/vendors/VendorsType");
const SetupDao = require("../SetupDao");


class TypeDao extends SetupDao{
    constructor() {
        super(Type)
    }
}
module.exports= TypeDao