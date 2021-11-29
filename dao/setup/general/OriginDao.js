const Origin = require("../../../models/setup/general/Origin");
const LogosDao = require("../../global/LogosDao");
const SetupDao = require("../SetupDao");

class OriginDao extends SetupDao {
    constructor() {
        super(Origin),
            this.LogosDao = new LogosDao()
    }

    async mountObj(data) {
        const origin = {
            ...data,
            logo: await this.LogosDao.findById(data.logo)
        }
        return new Origin(origin)
    }
}
module.exports = OriginDao