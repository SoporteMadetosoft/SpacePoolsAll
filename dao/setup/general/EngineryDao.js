const Enginery = require("../../../models/setup/general/Enginery");
const SetupDao = require("../SetupDao");


class EngineryDao extends SetupDao{
    constructor() {
        super(Enginery)
    }
}
module.exports= EngineryDao