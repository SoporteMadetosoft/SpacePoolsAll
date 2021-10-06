// const Repair = require("../../models/trailer/Repair");
const Trailer = require("../../models/trailer/Trailer");
const SetupDao = require("../setup/SetupDao");

const StatusDao = require("../global/StatusDao");
const RepairDao = require("../trailer/RepairDao");
const BrandModelDao = require("../setup/vehicles/BrandModelDao");
const BrandDao = require("../setup/vehicles/BrandDao");
const FileManagerDao = require("../global/FileManagerDao");
const TrailerDocumentsDao = require("./TrailerDocumentsDao");

class TrailerDao extends SetupDao {
    constructor() {
        super(Trailer);
        this.RepairDao = new RepairDao()
        this.StatusDao = new StatusDao()
        this.ModelDao = new BrandModelDao()
        this.BrandDao = new BrandDao()
        this.FileManagerDao = new FileManagerDao(TrailerDocumentsDao)
    }

    async mountObj(data) {
        const trailer = {
            ...data,
            repairs: await this.RepairDao.findByTrailerId(data.id),
            idStatus: await this.StatusDao.findById(data.idStatus),
            ITVdate: await this.datetimeToDate(data.ITVdate),
            maintenanceDate: await this.datetimeToDate(data.maintenanceDate),
            insuranceDateLimit: await this.datetimeToDate(data.insuranceDateLimit),
            model: await this.ModelDao.findById(data.model),
            documents: await this.FileManagerDao.getDocumentsInfo(data.filePath)
        }
        return new Trailer(trailer)
    }

    async mountList(data) {
        const model = await this.ModelDao.findById(data.model)
        const brand = await this.BrandDao.findById(model.idBrand.value)

        const list = {
            ...data,
            ITVdate: this.datetimeToEuropeDate(data.ITVdate),
            repairs: await this.RepairDao.findByTrailerId(data.id),
            mod: model != undefined ? model.name : '',
            br: brand != undefined ? brand.name : '',

        }

        const { id, trailerCode, plate, br, mod, ITVdate, repairs } = list
        const nObj = { id: id, trailerCode: trailerCode, plate: plate, brand: br, model: mod, ITVdate: ITVdate, repairs: repairs }
        return nObj
    }

}
module.exports = TrailerDao