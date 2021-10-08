const Canvas = require('../../models/order/Canvas')
const GenericDao = require("../GenericDao");
const ItemDao = require("../item/ItemDao");


class CanvasDao extends GenericDao {
    constructor() {
        super(Canvas)
        this.ItemDao = new ItemDao
    }

    async mountObj(data) {
        const canvas = {
            ...data,
            //imgUrl: await this.ItemDao.findOneFieldById("imgUrl", data.idElemento)

        }
        return canvas
    }

    findByOrderId(id) {
        // console.log(`SELECT * FROM orders_canvas WHERE idOrder = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders_canvas WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    const customerData = []
                    for (const canvasItem of result) {
                        customerData.push(await this.mountObj(canvasItem))
                    }
                    resolve(customerData)
                }
            })
        })
    }
}
module.exports = CanvasDao