const ItemColors = require("../../models/item/ItemColors");
const GenericDao = require("../GenericDao");
//const ColorsDao = require("../setup/item/ColorsDao")
const ProductFamilyDao = require("../item/ProductFamilyDao");
const ProductPlaceDao = require("../setup/item/PlaceDao")
const ItemTypeDao = require("../global/ItemTypeDao");
const VendorDao = require("../vendor/VendorDao");
const ShowDao = require("../global/ShowDao");
const ItemColorStockDao = require("../../dao/item/ItemColorStockDao")


class ItemsColorsDao extends GenericDao {
    constructor() {
        super(ItemColors)
        this.ProductFamilyDao = new ProductFamilyDao()
        this.ProductPlaceDao = new ProductPlaceDao()
        this.ItemTypeDao = new ItemTypeDao()
        //this.ColorsDao = new ColorsDao()
        this.ItemColorStockDao = new ItemColorStockDao()
        this.VendorDao = new VendorDao()
        this.ShowDao = new ShowDao()
    }

    async mountObj(data) {
        const colorName = await this.ItemColorStockDao.findByItemId(data.id)
        const itemColors = {
            ...data,
           // idcolor : await this.ColorsDao.findById(data.idcolor)
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
        //const na = await this.findNameById(data.itemCode)
        const list = {
            ...data, 
            reserveStock: rs !== null ? rs : 0,
            stock: st.stock !== null ? st.stock : 0,
            //name : na.name !== undefined ? na.name : ''
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

    findNameById(idItem){
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

    // findByItemId(id) {
    //     // console.log(`SELECT idColor FROM item_colors WHERE idItem = ${id}`)
    //     return new Promise((resolve, reject) => {
    //         this.db.query('SELECT * FROM item_colors WHERE idItem = ?', [id], async (err, result) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 let colorList = []
    //                 for (const color of result) {
    //                     colorList.push({
    //                         idColor: await this.mountColor(color),
    //                         stock: color.stock
    //                     })
    //                 }
    //                 resolve(colorList)
    //             }
    //         })
    //     })
    // }


}
module.exports = ItemsColorsDao