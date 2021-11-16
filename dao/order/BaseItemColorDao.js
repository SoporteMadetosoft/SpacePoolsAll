const BaseItemColor = require('../../models/order/BaseItemColor');
const GenericDao = require("../GenericDao");
const ItemsColorsDao = require('../item/ItemColorsDao');

class BaseItemColorDao extends GenericDao {
    constructor() {
        super(BaseItemColor)
        this.ItemsColorsDao = new ItemsColorsDao()
    }

    async mountObj(data) {
        const baseItem = {
            ...data,
        }
        let baseItem2 = new BaseItemColor(baseItem)

        baseItem2 = {
            ...baseItem2,
            name: await this.ItemsColorsDao.findOneFieldById("name", data.idItem),
            coste: await this.ItemsColorsDao.findOneFieldById("cost", data.idItem),
            show: await this.ItemsColorsDao.findOneFieldById("show", data.idItem)
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
module.exports = BaseItemColorDao