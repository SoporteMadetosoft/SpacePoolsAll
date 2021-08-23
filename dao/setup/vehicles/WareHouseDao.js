const WareHouse = require("../../../models/setup/vehicles/VehiclesWarehouse");
const SetupDao = require("../SetupDao");


class WareHouseDao extends SetupDao{
    constructor() {
        super(WareHouse)
    }
}
module.exports= WareHouseDao