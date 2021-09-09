const Production = require("../../models/production/Production");
const GenericDao = require("../GenericDao");
const OrderDao = require("../order/OrderDao")
const PoolDao = require("../pool/PoolDao")

class ProductionDao extends GenericDao {
    constructor() {
        super(Production);
        this.OrderDao = new OrderDao()
        this.PoolDao = new PoolDao()
    }

    async mountObj(data) {
        const production = {
            ...data,

        }
        return new Production(production)
    }

    async mountList(data) {
        const order = await this.OrderDao.findOrderById(data.orderId);
        const pool = await this.PoolDao.findPoolById(order.poolId);
        const list = {
            ...data,
            orderCode: order != undefined ? order.orderCode : 'p',
            orderDate: order != undefined ? order.orderDate : 'p',
            deliveryDate: order != undefined ? order.deliveryDate : 'p',
            deliverySchedulerStart: order != undefined ? order.deliverySchedulerStart : 'p',
            deliverySchedulerEnd: order != undefined ? order.deliverySchedulerEnd : 'p',
            observations: order != undefined ? order.observations : 'p',
            pools: pool != undefined ? pool.fabricationName : 'P'

        }
        const { observations, orderId, productionCode, status, orderCode, pools, orderDate, deliveryDate, deliverySchedulerStart, deliverySchedulerEnd } = list

        const newOrderDate = this.datetimeToEuropeDate(orderDate)
        const newDeliveryDate = this.datetimeToEuropeDate(deliveryDate)

        const nObj = { observations: observations, orderCode: orderId, productionCode: productionCode, status: status, orderCode: orderCode, pool: pools, orderDate: newOrderDate, deliveryDate: newDeliveryDate, deliveryTime: deliverySchedulerStart + " - " + deliverySchedulerEnd }

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