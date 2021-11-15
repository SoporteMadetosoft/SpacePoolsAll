const ExtraItem = require("../../models/pool/ExtraItem");
const GenericDao = require("../GenericDao");

const ItemDao = require("../item/ItemDao");

class ExtraItemDao extends GenericDao {
    constructor() {
        super(ExtraItem);
        this.ItemDao = new ItemDao()
    }

    async mountObj(data) {
        const extraItem = {
            ...data,
            idItem: await this.ItemDao.findById(data.idItem),
            coste: await this.ItemDao.findOneFieldById("cost", data.idItem),
        }

        return extraItem
    }

    async mountList(data) {
        const list = {
            ...data,

        }
        const {  idItem } = list
        const nObj = { idItem: idItem }
        return nObj
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM pool_extra_items WHERE idOrder = ?', [id], async (err, result) => {
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
            this.db.query(`SELECT * FROM orders_extra_items WHERE idOrder = ?`, [idOrder], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let ItemList = []
                    for (const data of result) {
                        const item = await this.ItemDao.findByItemTypeAndId(data.idItem, itemType)
                        if (item[0]) {
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
            this.db.query('SELECT id FROM orders_extra_items WHERE idItem = ? and idOrder = ?', [id, idOrder], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    }

}

module.exports = ExtraItemDao