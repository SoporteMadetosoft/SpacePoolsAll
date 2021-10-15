const Colors = require("../../../models/setup/Item/Colors");
const SetupDao = require("../SetupDao");

class ColorsDao extends SetupDao {

    constructor() {
        super(Colors)
    }
}
module.exports = ColorsDao