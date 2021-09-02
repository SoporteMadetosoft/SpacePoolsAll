const Item = require("../../models/item/Item");
const GenericDao = require("../GenericDao");

const ProductPlaceDao = require("../setup/item/PlaceDao");
const ProductFamilyDao = require("../item/ProductFamilyDao");
//const PurchaseItemsDao = require("../purchase/ItemDao");

class ItemDao extends GenericDao {
    ProductFamilyDao
    ProductPlaceDao
    //PurchaseItemsDao

    constructor() {
        super(Item);
        this.ProductFamilyDao = new ProductFamilyDao()
        this.ProductPlaceDao = new ProductPlaceDao()
        //this.PurchaseItemsDao = new PurchaseItemsDao()

    }

    async mountObj(data) {
        const item = {
            ...data,
            family: await this.ProductFamilyDao.findById(data.family),
            place: await this.ProductPlaceDao.findById(data.place)

        }

        return new Item(item)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { id, itemCode, name, description, stock } = list
        const nObj = { id: id, itemCode: itemCode, name: name, description: description, stock: stock }
        return nObj
    }
}

module.exports = ItemDao