const Carrier = require("../../models/carrier/Carrier");
const SetupDao = require("../setup/SetupDao");

const StatusDao = require("../global/StatusDao");

let status;

class CarrierDao extends SetupDao {
    StatusDao

    constructor() {
        super(Carrier);
        this.StatusDao = new StatusDao()
    }

    async mountObj(data) {
        status = await this.StatusDao.findById(data.idStatus)

        const carrier = {
            ...data,
            idStatus: await this.createSelect(status.base)
        }

        return new Carrier(carrier)
    }

    async mountList(data) {
        status = await this.StatusDao.findById(data.idStatus)
        const list = {
            ...data,
            idStatus: status != undefined ? status.base.name : ''
        }
        const { id, carrierCode, name, NIF, email, phone, phone2, idStatus } = list
        const nObj = { id: id, carrierCode: carrierCode, name: name, NIF: NIF, email: email, phone: phone, phone2: phone2, idStatus: idStatus }
        return nObj
    }
}
module.exports = CarrierDao