const VehiclesBrandModel = require("../../../models/setup/vehicles/VehiclesBrandModel");
const SetupDao = require("../SetupDao");
const BrandDao = require("./BrandDao");


class BrandModelDao extends SetupDao {
    constructor() {
        super(VehiclesBrandModel)
        this.brandDao = new BrandDao()
    }

    getSelectByBrand(brandId) {
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

    async mountList(data) {

        let brand = await this.brandDao.findById(data.idBrand);
        const list = {
            ...data,
            idBrand: brand.name
        }
        return list
    }

    async mountObj(data) {

        if (data !== undefined) {
            const setup = {
                ...data,
                idBrand: await this.brandDao.findById(data.idBrand)
            }
            return new this.object(setup)
        }
    }

}
module.exports = BrandModelDao