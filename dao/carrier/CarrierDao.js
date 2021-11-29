const Carrier = require("../../models/carrier/Carrier");
const GenericDao = require("../GenericDao");
const StatusDao = require("../global/StatusDao");
const FileManagerDao = require("../global/FileManagerDao");
const CarrierDocumentsDao = require("./CarrierDocumentsDao");
const UserDao = require("../user/UserDao");

let status;
class CarrierDao extends GenericDao {
    constructor() {
        super(Carrier);
        this.StatusDao = new StatusDao()
        this.UserDao = new UserDao()
        this.FileManagerDao = new FileManagerDao(CarrierDocumentsDao)
    }

    async mountObj(data) {
        const { id, fullname } = data.idUser !== null ? await this.UserDao.findById(data.idUser) : { id: '', fullname: '' }
        const carrier = {
            ...data,
            idUser: { id, fullname },
            idStatus: await this.StatusDao.findById(data.idStatus),
            documents: await this.FileManagerDao.getDocumentsInfo(data.filePath)
        }
        return new Carrier(carrier)
    }

    async mountList(data) {
        status = await this.StatusDao.findById(data.idStatus)
        const list = {
            ...data
        }
        const { id, carrierCode, name, NIF, email, phone, phone2, idStatus } = list
        const nObj = { id: id, carrierCode: carrierCode, name: name, NIF: NIF, email: email, phone: phone, phone2: phone2, idStatus: idStatus }
        return nObj
    }
}
module.exports = CarrierDao