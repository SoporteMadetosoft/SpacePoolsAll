const ExtraItem = require("../../models/order/ExtraItem");
const GenericDao = require("../GenericDao");

const ItemDao = require("../item/ItemDao");

class ExtraItemDao extends GenericDao {
    constructor() {
        super(ExtraItem);
        this.ItemDao = new ItemDao
    }

    async mountObj(data) {
        const extraItem = {
            ...data,
            itemId: await this.ItemDao.findById(data.itemId),
        }
        return new ExtraItem(extraItem)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { orderId, itemId } = list
        const nObj = { orderId: orderId, itemId: itemId }
        return nObj
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders_extra_items WHERE orderId = ?', [id], (err, result) => {
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

}

module.exports = ExtraItemDao