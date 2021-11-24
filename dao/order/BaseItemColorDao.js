const BaseItemColor = require('../../models/order/BaseItemColor');
const GenericDao = require("../GenericDao");
const ItemsColorsDao = require('../item/ItemColorsDao');

class BaseItemColorDao extends GenericDao {
    constructor() {
        super(BaseItemColor)
        this.ItemsColorsDao = new ItemsColorsDao()
    }

    async mountObj(data) {
        const colData = await this.ItemsColorsDao.findByItemId(data.idItem)
        const colores = colData.map(el => ({
            label: el.idColor.name,
            value: el.idColor.id
        }))

        const selectedColor = await this.ItemsColorsDao.ColorsDao.findById(data.idColor)

        const baseItem = {
            ...data,
        }
        let baseItem2 = new BaseItemColor(baseItem)
        baseItem2 = {
            ...baseItem2,
            name: await this.ItemsColorsDao.findOneFieldById("name", data.idItem),
            coste: await this.ItemsColorsDao.findOneFieldById("cost", data.idItem),
            show: await this.ItemsColorsDao.findOneFieldById("show", data.idItem),
            idColor: selectedColor.id !== undefined ? selectedColor : '',
            colores: colores
        }
        return baseItem2
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            // console.log(`SELECT * FROM orders_base_item_colors WHERE idOrder = ${id}`)
            this.db.query('SELECT * FROM orders_base_item_colors WHERE idOrder = ?', [id], async (err, result) => {
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