const Language = require("../../models/setup/customer/CustomerLanguage");
const SetupDao = require("../setup/SetupDao");


class LanguageDao extends SetupDao{
    constructor() {
        super(Language)
    }
}
module.exports= LanguageDao