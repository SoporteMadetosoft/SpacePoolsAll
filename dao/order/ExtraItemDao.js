const ExtraItem = require("../../models/order/ExtraItem");
const GenericDao = require("../GenericDao");

const ItemDao = require("../item/ItemDao");

class ExtraItemDao extends GenericDao {
    constructor() {
        super(ExtraItem);
        //this.ItemDao = new ItemDao()
    }

    async mountObj(data) {
        const extraItem = {
            ...data,
            idItem: await this.ItemDao.findById(data.idItem),
        }
        return new ExtraItem(extraItem)
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
            this.db.query('SELECT * FROM orders_extra_items WHERE idOrder = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const customerData = []
                    for (const centerDB of result) {
                        customerData.push(this.mountObj(centerDB))
                    }

                    resolve(customerData)
                }
            })
        })
    }

    countItemById(id, idOrder){
        return new Promise ((resolve, reject) => {
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