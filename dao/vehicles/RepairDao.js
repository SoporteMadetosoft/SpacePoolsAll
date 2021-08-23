const Repair = require("../../models/vehicles/Repair");
const GenericDao = require("../GenericDao");


class RepairDao extends GenericDao {
    
    constructor() {
        super(Repair);
    }

    findByVehicleId(id) {
        return new Promise( (resolve, reject) => {
            this.db.query('SELECT * FROM vehicle_repair WHERE vehicleId  = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    let RepairList =[]
                    for (const data of result) {
                        const obj = await this.mountList(data)

                        RepairList.push(obj)

                    }
                    resolve(RepairList)
                }
            })
        })
    }

    async mountList(data) {
        const list = {
            ...data,
        }

        const{date, description, garage} =list
        const nObj = {date :date, description :description, garage: garage,}
        return nObj
    }

    
    async mountObj(data) {
        const repair = {
            ...data,
        }
        return new Repair(repair)
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

module.exports = RepairDao