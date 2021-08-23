const VehiclesBrandModel = require("../../../models/setup/vehicles/VehiclesBrandModel");
const SetupDao = require("../SetupDao");


class BrandModelDao extends SetupDao{
    constructor() {
        super(VehiclesBrandModel)
    }
}
module.exports= BrandModelDao