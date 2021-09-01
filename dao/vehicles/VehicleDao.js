const Vehicle = require("../../models/vehicles/Vehicles");
const GenericDao = require("../GenericDao");

const RepairDao = require("../vehicles/RepairDao");
const StatusDao = require("../global/StatusDao");
const BrandModelDao = require("../setup/vehicles/BrandModelDao");

class VehicleDao extends GenericDao {
    constructor() {
        super(Vehicle);
        this.RepairDao = new RepairDao()
        this.StatusDao = new StatusDao()
        this.ModelDao = new BrandModelDao()
    }

    async mountObj(data) {
        const vehicle = {
            ...data,
            repairs: await this.RepairDao.findByVehicleId(data.id),
            status: await this.StatusDao.findById(data.status),
            model: await this.ModelDao.findById(data.model)
        }
        return new Vehicle(vehicle)
    }

    async mountList(data) {
        const list = {
            ...data,

        }
        const { id, vehicleCode, plate, carrierId, frameNumber } = list
        const nObj = { id: id, vehicleCode: vehicleCode, plate: plate, carrierId: carrierId, frameNumber: frameNumber }
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
                        objList.push(res)
                    }

                    resolve(objList)
                }
            });
        })
    }
}
module.exports = VehicleDao