const Production = require("../../models/production/Production");
const GenericDao = require("../GenericDao");
const OrderDao = require("../order/OrderDao")

class ProductionDao extends GenericDao {
    constructor() {
        super(Production);
        this.OrderDao = new OrderDao()
    }

    async mountObj(data) {
        const production = {
            ...data,

        }
        return new Production(production)
    }

    async mountList(data) {
        const Order = await this.OrderDao.findByOrderId(data.orderId);
        const list = {
            ...data,


        }
        const { orderId, productionCode, status } = list
        const nObj = { orderCode: orderId, productionCode: productionCode, status: status }
        return nObj
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM production WHERE orderId = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const order = []
                    for (const centerDB of result) {
                        order.push(this.mountObj(centerDB))
                    }

                    resolve(order)
                }
            })
        })
    }

}

module.exports = ProductionDao