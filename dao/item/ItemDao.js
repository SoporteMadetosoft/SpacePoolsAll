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
        // const productFamily = await this.ProductFamilyDao.findById(data.subfamily)
        // const productPlace = await this.ProductPlaceDao.findById(data.place)

        const item = {
            ...data,
            // family: await this.createSelect(productFamily),
            // subfamily: await this.createSelect(productFamily),
            // place: await this.createSelect(productPlace),
            // purchasesItems: await this.PurchaseItemsDao.findByItemId(data.id)

        }
    
        return new Item(item)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { id, name, description, stock } = list
        const nObj = { id: id, name: name, description: description, stock: stock }
        return nObj
    }
}

module.exports = ItemDao