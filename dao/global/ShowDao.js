const Show = require("../../models/global/Show");
const SetupDao = require("../setup/SetupDao");


class ShowDao extends SetupDao {
    constructor() {
        super(Show)
    }
}
module.exports = ShowDao