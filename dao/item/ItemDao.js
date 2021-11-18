const Item = require("../../models/item/Item");
const GenericDao = require("../GenericDao");

const ProductPlaceDao = require("../setup/item/PlaceDao");
const ProductFamilyDao = require("../item/ProductFamilyDao");
const ItemTypeDao = require("../global/ItemTypeDao");
const VendorDao = require("../vendor/VendorDao");
const ShowDao = require("../global/ShowDao");

class ItemDao extends GenericDao {
    constructor() {
        super(Item);
        this.ProductFamilyDao = new ProductFamilyDao()
        this.ProductPlaceDao = new ProductPlaceDao()
        this.ItemTypeDao = new ItemTypeDao()
        this.VendorDao = new VendorDao()
        this.ShowDao = new ShowDao()
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
            idVendor: data.idVendor !== null ? await this.VendorDao.findById(data.idVendor) : null,
            itemType: await this.ItemTypeDao.findById(data.itemType),
            idFamily: await this.ProductFamilyDao.findById(data.idFamily),
            idPlace: await this.ProductPlaceDao.findById(data.idPlace),
            show: await this.ShowDao.findById(data.show)
        }
        return new Item(item)
    }

    async mountList(data) {
        const rs = await this.findReservedStock(data.id)
        const list = {
            ...data,
            reserveStock: rs !== null ? rs : 0,
        }

        const { id, itemCode, name, description, reserveStock, stock } = list
        const nObj = { id, itemCode, name, description, reserveStock, stock }
        return nObj
    }

    // totalStock(id){
    //     return new Promise((resolve, reject) => {
    //         this.db.query(`SELECT stock FROM item WHERE id = ?`, [id], (err, result) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 const tStock = result[0].stock
    //                 const reserveStock = this.findReservedStock(id)
    //                 resolve(tStock - reserveStock)
    //             }
    //         })
    //     })
    // }

    findOneFieldById(field, id) {
        //console.log(`SELECT ${field} FROM item WHERE id = ${id}`)
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
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE item_colors SET stock = stock ${action} ? WHERE id = ?`, [quantity, id], (err, result) => {
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
            this.db.query(`SELECT cantidadBase, cantidadExtra FROM reservestock WHERE IDITEM = ?`, [idItem], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const cantidadBase = result[0].cantidadBase
                    const cantidadExtra = result[0].cantidadExtra

                    resolve(cantidadBase + cantidadExtra)
                }
            })
        })
    }

}

module.exports = ItemDao


// CREATE VIEW reserveStock AS SELECT 
// 	i.id as IDITEM,
//     (SELECT SUM(quantity) FROM orders_base_items WHERE idOrder IN (SELECT id FROM orders WHERE state = '0') AND idItem = i.id) as cantidadBase,
//     (SELECT SUM(quantity) FROM orders_extra_items WHERE idOrder IN (SELECT id FROM orders WHERE state = '0') AND idItem = i.id) as cantidadExtra
// FROM item i  