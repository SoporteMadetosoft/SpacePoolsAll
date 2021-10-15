const BaseItem = require('../../models/order/BaseItem')
const GenericDao = require("../GenericDao");
const ItemDao = require("../item/ItemDao")

class BaseItemDao extends GenericDao {
    constructor() {
        super(BaseItem)
        this.ItemDao = new ItemDao
    }

    async mountObj(data) {
        const baseItem = {
            ...data,
        }
        let baseItem2 = new BaseItem(baseItem)
        baseItem2 = {
            ...baseItem2,
            name: await this.ItemDao.findNameById(data.idItem),
            coste: await this.ItemDao.findOneFieldById("cost", data.idItem)
        }

        return baseItem2
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders_base_items WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const customerData = []
                    for (const centerDB of result) {
                        customerData.push(await this.mountObj(centerDB))
                    }

                    resolve(customerData)
                }
            })
        })
    }
}
module.exports = BaseItemDao