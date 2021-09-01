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
        const { name: parentName } = await this.findById(data.parent)
        const list = {
            ...data,
            parent: parentName ? parentName : 'Nadie'
        }
        const nObj = list
        return nObj
    }

}

module.exports = ProductFamilyDao