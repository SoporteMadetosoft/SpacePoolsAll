const Mode = require("../../models/global/Mode");
const SetupDao = require("../setup/SetupDao");

class ModeDao extends SetupDao{
    
    constructor() {
        super(Mode)
    }
}
module.exports = ModeDao