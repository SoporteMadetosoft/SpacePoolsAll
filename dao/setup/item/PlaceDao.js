const Place = require("../../../models/setup/Item/Place");
const SetupDao = require("../SetupDao");

class PlaceDao extends SetupDao{
    
    constructor() {
        super(Place)
    }
}
module.exports = PlaceDao