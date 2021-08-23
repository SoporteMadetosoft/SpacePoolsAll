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
        const productFamily = await this.ProductFamilyDao.findById(data.subfamily)
        const productPlace = await this.ProductPlaceDao.findById(data.place)
        console.log(productFamily)
        console.log(productPlace)
        const item = {
            ...data,
            family: await this.createSelect(productFamily.base),
            subfamily: await this.createSelect(productFamily.base),
            place: await this.createSelect(productPlace.base),
            //purchasesItems: await this.PurchaseItemsDao.findByItemId(data.id)

        }
        console.log(item)
        return new Item(item)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const{id, name, description, stock} =list
        const nObj = {id:id, name:name, description:description, stock:stock}
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

module.exports = ItemDao