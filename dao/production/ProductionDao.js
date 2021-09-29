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
        console.log(production)
        return new Production(production)
    }

    async mountList(data) {
        const order = await this.OrderDao.findOrderById(data.idOrder);
        const pool = await this.PoolDao.findPoolById(order.idPool);
        const list = {
            ...data,
            orderCode: order != undefined ? order.orderCode : '',
            orderDate: order != undefined ? order.orderDate : '',
            deliveryDate: order != undefined ? order.deliveryDate : '',
            deliverySchedulerStart: order != undefined ? order.deliverySchedulerStart : '',
            deliverySchedulerEnd: order != undefined ? order.deliverySchedulerEnd : '',
            observations: order != undefined ? order.observations : '',
            pools: pool != undefined ? pool.fabricationName : ''

        }
        const { id, orderCode, pools, orderDate, deliveryDate, deliverySchedulerStart, deliverySchedulerEnd, observations, isStarted} = list

        const newOrderDate = this.datetimeToEuropeDate(orderDate)
        const newDeliveryDate = this.datetimeToEuropeDate(deliveryDate)

        const nObj = { 
            id: id,
            orderCode: orderCode,
            pool: pools,
            orderDate: newOrderDate,
            deliveryDate: newDeliveryDate,
            deliveryTime: deliverySchedulerStart + " - " + deliverySchedulerEnd,
            observations: observations,
            isStarted: isStarted
        }
        return nObj
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM production WHERE idOrder = ?', [id], (err, result) => {
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

    switchStart(id) {
        return new Promise((resolve, reject) => {
            this.db.query('UPDATE production SET isStarted = (CASE isStarted WHEN 1 THEN 0 ELSE 1 END) WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            })
        })
    }

}

module.exports = ProductionDao