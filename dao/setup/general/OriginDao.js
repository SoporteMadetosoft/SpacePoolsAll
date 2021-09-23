const Origin = require("../../../models/setup/general/Origin");
const SetupDao = require("../SetupDao");


class OriginDao extends SetupDao {
    constructor() {
        super(Origin)
    }
}
module.exports = OriginDao