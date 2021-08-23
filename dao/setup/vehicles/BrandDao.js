const VehiclesBrand = require("../../../models/setup/vehicles/VehiclesBrand");
const SetupDao = require("../SetupDao");


class BrandDao extends SetupDao{
    constructor() {
        super(VehiclesBrand)
    }
}
module.exports= BrandDao