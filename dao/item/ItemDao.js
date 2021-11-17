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
        const st = await this.totalStock(data.id)
        const list = {
            ...data,
            reserveStock: rs !== null ? rs : 0,
            stock: st.stock !== null ? st.stock : 0
        }

        const { id, itemCode, name, description, reserveStock, stock } = list
        const nObj = { id, itemCode, name, description, reserveStock, stock }
        return nObj
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
        return (
            this.db.query(`SELECT cantidadBase, cantidadExtra FROM reserveStock WHERE IDITEM = ?`, [idItem], (err, result) => {
                if (err) {
                    (err)
                } else {
                    const cantidadBase = result[0].cantidadBase
                    const cantidadExtra = result[0].cantidadExtra

                    return (cantidadBase + cantidadExtra)
                }
            })
        )
        
    }

    totalStock(idItem) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT SUM(stock) AS stock FROM item_colors WHERE idItem = ?`, [idItem], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    }

     comprobacionStock(idItem) {
        const stockResta = this.findReservedStock(idItem)
        console.log(stockResta)
        
        // this.db.query(`UPDATE item SET stock = stock - ${stockResta} WHERE idItem = ${idItem}`)
        // console.log(`UPDATE item SET stock = stock - ${stockResta} WHERE idItem = ${idItem}`)
  
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT stock, name FROM item WHERE id = ? AND stock <= minimumStock`, [idItem], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
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