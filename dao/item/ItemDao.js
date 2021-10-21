const Item = require("../../models/item/Item");
const GenericDao = require("../GenericDao");

const ProductPlaceDao = require("../setup/item/PlaceDao");
const ProductFamilyDao = require("../item/ProductFamilyDao");
const ItemTypeDao = require("../global/ItemTypeDao");
const VendorDao = require("../vendor/VendorDao");
const ItemsColorsDao = require("./ItemColorsDao");
//const PurchaseItemsDao = require("../purchase/ItemDao");

class ItemDao extends GenericDao {
    constructor() {
        super(Item);
        this.ProductFamilyDao = new ProductFamilyDao()
        this.ProductPlaceDao = new ProductPlaceDao()
        this.ItemTypeDao = new ItemTypeDao()
        this.VendorDao = new VendorDao()
        this.ItemsColorsDao = new ItemsColorsDao()
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
    findByItemTypeAndVendor(itemType, idVendor) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM item WHERE itemType = ? AND idVendor = ?', [itemType, idVendor], async (err, result) => {
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
        // console.log(`SELECT * FROM item WHERE id = ${id} AND itemType = ${itemType}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM item WHERE id = ? AND itemType = ?', [id, itemType], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountObj(res))
                    }
                    resolve(objList)
                }
            });
        })
    }


    async mountObj(data) {
        const item = {
            ...data,
            idVendor: await this.VendorDao.findById(data.idVendor),
            itemType: await this.ItemTypeDao.findById(data.itemType),
            idFamily: await this.ProductFamilyDao.findById(data.idFamily),
            idPlace: await this.ProductPlaceDao.findById(data.idPlace),
            idColor: await this.ItemsColorsDao.findByItemId(data.id)
        }
        return item
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        // this.OrderDao = new OrderDao()
        // this.ExtraItemDao = new ExtraItemDao()

        // let activates = await this.OrderDao.findActiveOrders()

        // for (let i = 0; i < activates.length; i++) {
        //     console.log(await this.ExtraItemDao.countItemById(data.id, activates[i]))
        // }

        const { id, itemCode, name, description, stock } = list
        const nObj = { id: id, itemCode: itemCode, name: name, description: description, stock: stock }
        return nObj
    }

    findNameById(id) {
        // console.log(`SELECT name FROM item WHERE id = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT name FROM item WHERE id = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result[0].name)
                }
            });
        })
    }

    findOneFieldById(field, id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT ?? FROM item WHERE id = ?', [field, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    if (result !== undefined) {
                        resolve(result[0][field])
                    }

                }
            })
        })
    }


}

module.exports = ItemDao