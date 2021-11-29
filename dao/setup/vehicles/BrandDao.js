const VehiclesBrand = require("../../../models/setup/vehicles/VehiclesBrand");
const SetupDao = require("../SetupDao");


class BrandDao extends SetupDao {
    constructor() {
        super(VehiclesBrand)
    }

    getSelectByModel(idModel) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ?? WHERE idBrand = ?', [this.objectAux.table, brandId], async (err, result) => {
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
module.exports = BrandDao