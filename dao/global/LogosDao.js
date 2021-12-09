const Logos = require("../../models/global/Logos");
const SetupDao = require("../setup/SetupDao");

class LogosDao extends SetupDao {
    constructor() {
        super(Logos)
    }
}
module.exports = LogosDao