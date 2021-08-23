const Status = require("../../models/global/Status");
const SetupDao = require("../setup/SetupDao");

class StatusDao extends SetupDao{
    
    constructor() {
        super(Status)
    }
}
module.exports = StatusDao