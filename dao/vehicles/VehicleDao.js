const Vehicle = require("../../models/vehicles/Vehicles");
const GenericDao = require("../GenericDao");

const RepairDao = require("../vehicles/RepairDao");
const StatusDao = require("../global/StatusDao");
const ModelDao = require("../setup/general/ModelDao");

class VehicleDao extends GenericDao{
    RepairDao
    StatusDao
    ModelDao

    constructor(){
        super(Vehicle);
        this.RepairDao = new RepairDao()
        this.StatusDao = new StatusDao()
        this.ModelDao = new ModelDao()
    }

    async mountObj(data){
        const status = await this.StatusDao.findById(data.status)
        const model = await this.ModelDao.findById(data.model)
        const vehicle={
            ...data,
            repairs: await this.RepairDao.findByVehicleId(data.id),
            status: await this.createSelect(status.base),
            model: await this.createSelect(model.base)
        }
        return new Vehicle(vehicle)
    }

    async mountList(data){
        const list = {
            ...data,

        }
        const{ vehicleCode, plate, carrierId, frameNumber}=list
        const nObj = {vehicleCode:vehicleCode, plate:plate, carrierId:carrierId, frameNumber:frameNumber}
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
    
    async mountSelect(data){
        return await this.createSelect(data)
        
    }
}   
module.exports = VehicleDao