const Type = require("../../../models/setup/vehicles/VehiclesType");
const SetupDao = require("../SetupDao");


class TypeDao extends SetupDao{
    constructor() {
        super(Type)
    }
}
module.exports= TypeDao