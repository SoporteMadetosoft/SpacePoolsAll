const Item = require("../../models/item/Item");
const GenericDao = require("../GenericDao");

const ProductPlaceDao = require("../setup/item/PlaceDao");
const ProductFamilyDao = require("../item/ProductFamilyDao");
const ItemTypeDao = require("../global/ItemTypeDao");
const OrderDao = require("../order/OrderDao");
const ExtraItemDao = require("../order/ExtraItemDao");
//const PurchaseItemsDao = require("../purchase/ItemDao");

class ItemDao extends GenericDao {
    ProductFamilyDao
    ProductPlaceDao
    //PurchaseItemsDao

    constructor() {
        super(Item);
        this.ProductFamilyDao = new ProductFamilyDao()
        this.ProductPlaceDao = new ProductPlaceDao()
        this.ItemTypeDao = new ItemTypeDao()
        //this.PurchaseItemsDao = new PurchaseItemsDao()
    }

    findByItemType(itemType) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM item WHERE itemType = ?', [itemType], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountList(res))
                    }

                    resolve(objList)
                }
            });
        })
    }

    findByItemTypeAndId(id, itemType) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM item WHERE id = ? AND itemType = ?', [id, itemType], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountList(res))
                    }

                    resolve(objList)
                }
            });
        })
    }


    async mountObj(data) {
        const item = {
            ...data,
            itemType: await this.ItemTypeDao.findById(data.itemType),
            family: await this.ProductFamilyDao.findById(data.family),
            place: await this.ProductPlaceDao.findById(data.place)
        }

        return new Item(item)
    }

    async mountList(data) {
        const list = {
            ...data,
        }

        let reserveStock = 0
        this.OrderDao = new OrderDao()
        this.ExtraItemDao = new ExtraItemDao()
        let activates = await this.OrderDao.findActiveOrders()
        console.log(activates)
        for(let i =0; i<activates.length; i++){
            if (await this.ExtraItemDao.countItemById(data.id, activates[i])!=undefined) reserveStock++
        }
        console.log(reserveStock)

        const { id, itemCode, name, description, stock } = list
        const nObj = { id: id, itemCode: itemCode, name: name, description: description, stock: stock, reserveStock: reserveStock, storeStock:data.stock - reserveStock
        }
        return nObj
    }
       
    
}

module.exports = ItemDao