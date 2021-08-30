const Repair = require("../../models/trailer/Repair");
const Trailer = require("../../models/trailer/Trailer");
const SetupDao = require("../setup/SetupDao");

const StatusDao = require("../global/StatusDao");
const RepairDao = require("../trailer/RepairDao");
const BrandModelDao = require("../setup/vehicles/BrandModelDao");
const BrandDao = require("../setup/vehicles/BrandDao");

class TrailerDao extends SetupDao {
    RepairDao
    StatusDao
    ModelDao
    BrandDao

    constructor() {
        super(Trailer);
        this.RepairDao = new RepairDao()
        this.StatusDao = new StatusDao()
        this.ModelDao = new BrandModelDao()
        this.BrandDao = new BrandDao()
    }

    async mountObj(data) {
        const status = await this.StatusDao.findById(data.idStatus)
        const model = await this.ModelDao.findById(data.model)
        const br = await this.BrandDao.findById(model.base.idBrand.value)
        const trailer = {
            ...data,
            repairs: await this.RepairDao.findByTrailerId(data.id),
            idStatus: await this.createSelect(status.base),
            ITVdate: await this.datetimeToDate(data.ITVdate),
            maintenanceDate: await this.datetimeToDate(data.maintenanceDate),
            insuranceDateLimit: await this.datetimeToDate(data.insuranceDateLimit),
            model: await this.createSelect(model.base),
            brand: await this.createSelect(br.base)
        }
        return new Trailer(trailer)
    }

    async mountList(data) {
        const model = await this.ModelDao.findById(data.model)
        const brand = await this.BrandDao.findById(model.base.idBrand.value)
        const list = {
            ...data,
            mod: model != undefined ? model.base.name : '',
            br: brand != undefined ? brand.base.name : '',

        }

        const { id, trailerCode, plate, br, mod, ITVdate } = list
        const nObj = { id: id, trailerCode: trailerCode, plate: plate, brand: br, model: mod, ITVdate: this.datetimeToDate(ITVdate) }
        return nObj
    }

    getSelect() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ??', [this.objectAux.table], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountSelect(res))
                    }

                    resolve(objList)
                }
            });
        })
    }

    async mountSelect(data) {
        return await this.createSelect(data)

    }
}
module.exports = TrailerDao