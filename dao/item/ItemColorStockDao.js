const ItemColorsStock = require("../../models/item/ItemColorStock")
const GenericDao = require("../GenericDao");

class ItemColorStockDao extends GenericDao {
    constructor() {
        super(ItemColorsStock);
         }

    async mountObj(data) {

        const colorStock = {
            ...data,
        }

        return new ItemColorsStock(colorStock)
    }

    async mountList(data) {
        //const { name: parentName } = await this.findById(data.parent)
        const list = {
            ...data,
           // parent: parentName ? parentName : 'Nadie'
        }
        const { id,idItem, idColor, stock }= list
        const nObj = { id, idItem, idColor, stock }
        return nObj
    }

}

module.exports = ItemColorStockDao