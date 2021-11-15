const ExtraItemColor = require("../../models/order/ExtraItemColor");
const GenericDao = require("../GenericDao");

const ItemDao = require("../item/ItemDao");

class ExtraItemColorDao extends GenericDao {
    constructor() {
        super(ExtraItemColor);
        this.ItemDao = new ItemDao()
    }

    async mountObj(data) {
        const colData = await this.ItemDao.ItemsColorsDao.findByItemId(data.idItem)
        const colores = colData.map(el => ({
            label: el.name,
            value: el.id
        }))
        const selectedColor = await this.ItemDao.ItemsColorsDao.ColorsDao.findById(data.idColor)
        const extraItem = {
            ...data,
            idItem: await this.ItemDao.findById(data.idItem),
            coste: await this.ItemDao.findOneFieldById("cost", data.idItem),
            idColor: selectedColor.id !== undefined ? selectedColor : '',
            colores: colores
        }

        return extraItem
    }

    async mountList(data) {
        const list = {
            ...data,

        }
        const { idOrder, idItem } = list
        const nObj = { idOrder: idOrder, idItem: idItem }
        return nObj
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders_extra_item_colors WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const customerData = []
                    for (const extraItem of result) {

                        const ovj = await this.mountObj(extraItem)
                        customerData.push(ovj)
                    }
                    resolve(customerData)
                    // resolve(result[0])
                }
            })
        })
    }

    async getItemsByTypeAndOrder(idOrder, itemType) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM orders_extra_item_colors WHERE idOrder = ?`, [idOrder], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let ItemList = []
                    for (const data of result) {
                        const item = await this.ItemDao.findByItemTypeAndId(data.idItem, itemType)
                        if (item[0]) {
                            console.log(item[0]['itemType'].id)
                            if (item[0]['itemType'].id === itemType) {
                                ItemList.push(await this.mountObj(data))
                            }
                        }
                        //ItemList.push(await this.mountObj(data))
                    }
                    resolve(ItemList)
                }
            });
        })
    }

    countItemById(id, idOrder) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT id FROM orders_extra_item_colors WHERE idItem = ? and idOrder = ?', [id, idOrder], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    }

}

module.exports = ExtraItemColorDao