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
                        objList.push(await this.mountSelect(res))
                    }

                    resolve(objList)
                }
            });
        })
    }

    unMountBase(data) {
        const model = {
            ...data,
            idBrand: this.undoSelect(data.idBrand)
        }

        return model
    }

    async mountList(data) {
    
        let brand = await this.brandDao.findById(data.idBrand);
        const list = {
            ...data,
            idBrand: brand.base.name
        }

        const{id, name, idBrand} = list
        const nObj = {id :id, name: name, idBrand: idBrand}
        return nObj
    }

    async mountObj(data) {
        
        if (data !== undefined) {
            const brand = await this.brandDao.findById(data.idBrand)
            const setup = {
                ...data,
                idBrand: await this.createSelect(brand.base)
            }
            return new this.object(setup)
        }
    }

}
module.exports = BrandModelDao