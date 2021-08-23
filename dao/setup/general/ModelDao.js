const Model = require("../../../models/setup/general/Model");
const SetupDao = require("../SetupDao");


class ModelDao extends SetupDao{
    constructor() {
        super(Model)
    }
}
module.exports= ModelDao