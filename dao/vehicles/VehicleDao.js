const Vehicle = require("../../models/vehicles/Vehicles");

const SetupDao = require("../setup/SetupDao");
const RepairDao = require("../vehicles/RepairDao");
const StatusDao = require("../global/StatusDao");
const BrandModelDao = require("../setup/vehicles/BrandModelDao");
const FileManagerDao = require("../global/FileManagerDao");
const VehicleDocumentsDao = require("./VehicleDocumentsDao");
const CarrierDao = require("../carrier/CarrierDao");
const TrailerDao = require("../trailer/TrailerDao");

class VehicleDao extends SetupDao {
    constructor() {
        super(Vehicle);
        this.RepairDao = new RepairDao()
        this.StatusDao = new StatusDao()
        this.ModelDao = new BrandModelDao()
        this.CarrierDao = new CarrierDao()
        this.TrailerDao = new TrailerDao()
        this.FileManagerDao = new FileManagerDao(VehicleDocumentsDao)
    }

    async mountObj(data) {
        const vehicle = {
            ...data,
            repairs: await this.RepairDao.findByVehicleId(data.id),
            status: await this.StatusDao.findById(data.status),
            model: await this.ModelDao.findById(data.model),
            idStatus: await this.StatusDao.findById(data.idStatus),
            idCarrier: await this.CarrierDao.findById(data.idCarrier),
            idTrailer: data.idTrailer !== null ? await this.TrailerDao.findById(data.idTrailer) : '',
            maintenanceDate: this.datetimeToDate(data.maintenanceDate),
            ITVdate: this.datetimeToDate(data.ITVdate),
            documents: await this.FileManagerDao.getDocumentsInfo(data.filePath)
        }
        return new Vehicle(vehicle)
    }

    async mountList(data) {
        let { name } = await this.CarrierDao.findById(data.idCarrier);
        const list = {
            ...data,
            idCarrier: name,
            ITVdate: this.datetimeToEuropeDate(data.ITVdate),
            repairs: await this.RepairDao.findByVehicleId(data.id)

        }

        return new Vehicle(list)
    }

    findByCarrierId(idCarrier) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM vehicles WHERE idCarrier = ?', [idCarrier], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(await this.mountObj(result[0]))
                }
            })
        })
    }
}
module.exports = VehicleDao