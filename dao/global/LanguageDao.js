const Language = require("../../models/global/Language");
const SetupDao = require("../setup/SetupDao");


class LanguageDao extends SetupDao{
    constructor() {
        super(Language)
    }
}
module.exports= LanguageDao