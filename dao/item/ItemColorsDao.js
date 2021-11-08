const ItemColors = require("../../models/item/ItemColors");
const GenericDao = require("../GenericDao");

class ItemsColorsDao extends GenericDao {
    constructor() {
        super(ItemColors)
        //this.ColorsDao = new ColorsDao()
    }

    async mountObj(data) {
        const itemColors = {
            ...data,
        }
        return new ItemColors(itemColors)
    }
    

    async mountList(data) {
        let itemColor = await this.findAllColors(data.id)
        const list = {
            ...data,
            id: itemColor
        }
        const { id, idColor, stock } = list
        const nObj = {id, idColor, stock}
        return nObj
    }


    findChilds(id, idNode) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM item_color_colors WHERE stock = ?`, id, async (err, result) => {
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
            this.db.query(`UPDATE item_color_colors SET stock = null WHERE id = ?`, id, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            });
        })
    }

    findAllColors(idNode) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM item_color_colors `, async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let treeData = [{
                        value: null,
                        label: 'Nadie'
                    }]
                    for (const res of result) {
                        if (parseInt(idNode) !== res.id) {
                            treeData.push({
                                value: res.id,
                                label: `${res.id} - ${res.name}`,
                                children: await this.findChilds(res.id, idNode)
                            })
                        }
                    }
                    resolve(treeData)
                }
            });
        })
    }

    findByItemId(id) {
        // console.log(`SELECT idColor FROM item_colors WHERE idItem = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM item_color_colors WHERE idcolor = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let colorList = []
                    for (const color of result) {
                        colorList.push({
                            idColor: await this.mountColor(color),
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