const ProductFamily = require("../../models/item/ProductFamily");
const GenericDao = require("../GenericDao");


class ProductFamilyDao extends GenericDao {

    constructor() {
        super(ProductFamily);
    }

    async mountObj(data) {

        const productFamily = {
            ...data,
            
        }
        return new ProductFamily(productFamily)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const{name, familyCode, parent} =list
        const nObj = {name :name, familyCode :familyCode, parent: parent}
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

module.exports = ProductFamilyDao