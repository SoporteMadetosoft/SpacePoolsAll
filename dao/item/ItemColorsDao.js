const ItemColors = require("../../models/item/ItemColors");
const GenericDao = require("../GenericDao");
const ProductFamilyDao = require("../item/ProductFamilyDao");
const ProductPlaceDao = require("../setup/item/PlaceDao")
const ItemTypeDao = require("../global/ItemTypeDao");
const VendorDao = require("../vendor/VendorDao");
const ShowDao = require("../global/ShowDao");

const ItemColorStockDao = require("../../dao/item/ItemColorStockDao");
const ColorsDao = require("../setup/item/ColorsDao");

class ItemsColorsDao extends GenericDao {
    constructor() {
        super(ItemColors)
        this.ProductFamilyDao = new ProductFamilyDao()
        this.ProductPlaceDao = new ProductPlaceDao()
        this.ItemTypeDao = new ItemTypeDao()
        this.ItemColorStockDao = new ItemColorStockDao()
        this.VendorDao = new VendorDao()
        this.ShowDao = new ShowDao()
        this.ColorsDao = new ColorsDao()
    }

    async mountObj(data) {
        const colorName = await this.ItemColorStockDao.findByItemId(data.id)
        const itemColors = {
            ...data,
            idVendor: data.idVendor !== null ? await this.VendorDao.findById(data.idVendor) : null,
            itemType: await this.ItemTypeDao.findById(data.itemType),
            idFamily: await this.ProductFamilyDao.findById(data.idFamily),
            idPlace: await this.ProductPlaceDao.findById(data.idPlace),
            show: await this.ShowDao.findById(data.show),
            color: colorName !== undefined ? colorName : ''
        }
        return new ItemColors(itemColors)
    }


    async mountList(data) {
        const rs = await this.findReservedStock(data.id)
        const st = await this.totalStock(data.id)
        const list = {
            ...data,
            reserveStock: rs !== null ? rs : 0,
            stock: st.stock !== null ? st.stock : 0,
        }
        const { id, itemCode, name, description, reserveStock, stock } = list
        const nObj = { id, itemCode, name, description, reserveStock, stock }
        return nObj
    }

    findByItemType(itemType) {
        return new Promise((resolve, reject) => {

            this.db.query('SELECT * FROM item2 WHERE itemType = ?', [itemType], async (err, result) => {
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
            this.db.query('SELECT * FROM item2 WHERE id = ? AND itemType = ?', [id, itemType], async (err, result) => {
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

    findByItemTypeAndVendor(itemType, idVendor) {
        return new Promise((resolve, reject) => {

            this.db.query('SELECT * FROM item2 WHERE itemType = ? AND idVendor = ?', [itemType, idVendor], async (err, result) => {

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

    findNameById(idItem) {
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

    findReservedStock(idItem) {
        //console.log(`SELECT SUM(cantidadBase) AS cantidadBase, SUM(cantidadExtra) AS cantidadExtra FROM reserveStockColor WHERE IDITEM = ${idItem}`)
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT SUM(cantidadBase) AS cantidadBase, SUM(cantidadExtra) AS cantidadExtra FROM reserveStockColor WHERE IDITEM = ?`, [idItem], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const cantidadBase = result[0].cantidadBase
                    const cantidadExtra = result[0].cantidadExtra
                    // console.log('baseItemsColor')
                    // console.log(result[0].cantidadBase, result[0].cantidadExtra)


                    resolve(cantidadBase + cantidadExtra)
                }
            })
        })
    }

    totalStock(idItem) {
        // console.log(`SELECT SUM(stock) AS stock FROM item_colors WHERE idItem = ${idItem}`)
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

    totalColorStock(idItem, idColor) {
        // console.log(`SELECT SUM(stock) AS stock FROM item_colors WHERE idItem = ${idItem}`)
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT SUM(stock) AS stock FROM item_colors WHERE idItem = ? AND idColor = ?`, [idItem, idColor], (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result[0])
                }
            })
        })
    }

    updateStock(action, id, idColor, quantity) {
        //console.log(`UPDATE item_colors SET stock = stock ${action} ${quantity} WHERE idItem = ${id} AND idColor = ${idColor}`)
        return new Promise((resolve, reject) => {
            // console.log(`UPDATE item_colors SET stock = stock ${action} ${quantity} WHERE idItem = ${id} AND idColor = ${idColor}`)
            this.db.query(`UPDATE item_colors SET stock = stock ${action} ? WHERE idItem = ? AND idColor = ?`, [quantity, id, idColor], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            })
        })
    }


    findChilds(id, idNode) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM item_colors WHERE stock = ?`, id, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    if (result.length > 0) {
                        let childs = []
                        for (const res of result) {
                            if (parseInt(idNode) !== res.id) {
                                childs.push({
                                    value: res.id,
                                    label: `${res.id} - ${res.name}`,
                                    children: await this.findChilds(res.id, idNode)
                                })
                            }
                        }
                        resolve(childs)
                    } else {
                        resolve('')
                    }
                }
            });
        })
    }

    setStockNullById(id) {

        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE item_colors SET stock = null WHERE id = ?`, id, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            });
        })
    }

    findOneFieldById(field, id) {
        //console.log(`SELECT ${field} FROM item2 WHERE id = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT ?? FROM item2 WHERE id = ?', [field, id], (err, result) => {
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


    findByItemId(id) {
        //console.log(`SELECT * FROM item_colors WHERE idItem = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM item_colors WHERE idItem = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let colorList = []
                    for (const color of result) {
                        const c = await this.ColorsDao.findById(color.idColor)

                        colorList.push({
                            idColor: c,
                            stock: color.stock
                        })
                    }
                    resolve(colorList)
                }
            })
        })
    }


}
module.exports = ItemsColorsDao


// CREATE VIEW reserveStockColor AS SELECT
//  	i.id as IDITEM,
//     ic.idColor as IDCOLOR,
//     (SELECT SUM(quantity) FROM orders_base_item_colors WHERE idOrder IN(SELECT id FROM orders WHERE state = '0') AND idItem = i.id AND idColor = ic.idColor) as cantidadBase,
//     (SELECT SUM(quantity) FROM orders_extra_item_colors WHERE idOrder IN(SELECT id FROM orders WHERE state = '0') AND idItem = i.id AND idColor = ic.idColor) as cantidadExtra
// FROM item2 i, item_colors ic WHERE i.id = ic.idItem;