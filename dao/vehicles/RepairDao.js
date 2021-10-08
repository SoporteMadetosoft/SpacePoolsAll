const Repair = require("../../models/vehicles/Repair");
const GenericDao = require("../GenericDao");

class RepairDao extends GenericDao {

    constructor() {
        super(Repair);
    }

    findByVehicleId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM vehicle_repair WHERE idVehicle = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    let RepairList = []
                    for (const data of result) {
                        const obj = await this.mountObj(data)

                        RepairList.push(obj)
                    }
                    resolve(RepairList)
                }
            })
        })
    }

    async mountObj(data) {

        const repair = {
            ...data,
            date: this.datetimeToDate(data.date)
        }
        return new Repair(repair)
    }
}
module.exports = RepairDao