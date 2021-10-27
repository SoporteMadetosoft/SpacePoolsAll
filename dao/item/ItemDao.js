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
        const rs = await this.findReservedStock(data.id)
        const list = {
            ...data,
            reserveStock: rs !== null ? rs : 0
        }

        const { id, itemCode, name, description, stock, reserveStock } = list
        const nObj = { id: id, itemCode: itemCode, name: name, description: description, stock: stock, reserveStock: reserveStock }
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

    updateStock(action, id, quantity) {
        // console.log(`UPDATE item SET stock = stock ${action} ${quantity} WHERE id = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE item SET stock = stock ${action} ? WHERE id = ?`, [quantity, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            })
        })
    }

    findReservedStock(idItem) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT (cantidadBase+cantidadExtra) as reserveStock FROM reserveStock WHERE IDITEM = ?`, [idItem], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0].reserveStock)
                }
            })
        })
    }
}

module.exports = ItemDao


// CREATE VIEW reserveStock AS SELECT 
// 	i.id as IDITEM,
//     (SELECT SUM(quantity) FROM orders_base_items WHERE idOrder IN (SELECT id FROM orders WHERE state = '0') AND idItem = IDITEM) as cantidadBase,
//     (SELECT SUM(quantity) FROM orders_extra_items WHERE idOrder IN (SELECT id FROM orders WHERE state = '0') AND idItem = IDITEM) as cantidadExtra
// FROM item i