const HookType = require("../../../models/setup/vehicles/VehiclesHookType");
const SetupDao = require("../SetupDao");


class HookTypeDao extends SetupDao{
    constructor() {
        super(HookType)
    }
}
module.exports= HookTypeDao