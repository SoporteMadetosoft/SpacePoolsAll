const Production = require("../../models/production/Production");
const GenericDao = require("../GenericDao");
const OrderDao = require("../order/OrderDao")
const PoolDao = require("../pool/PoolDao");
const ColorsDao = require("../setup/item/ColorsDao");

class ProductionDao extends GenericDao {
    constructor() {
        super(Production);
        this.OrderDao = new OrderDao()
        this.PoolDao = new PoolDao()
        this.ColorsDao = new ColorsDao()
    }

    async mountObj(data) {
        const production = {
            ...data,
            orderData: await this.OrderDao.mountObj(await this.OrderDao.findOrderById(data.idOrder)),
            

        }
        return production
    }

    async mountList(data) {
        const order = await this.OrderDao.findOrderById(data.idOrder);
        const pool = await this.PoolDao.findPoolById(order.idPool);
        const color = await this.ColorsDao.findColorById(order.idColor);
        const list = {
            ...data,
            orderCode: order != undefined ? order.orderCode : '',
            orderDate: order != undefined ? order.orderDate : '',
            deliveryDate: order != undefined ? order.deliveryDate : '',
            deliverySchedulerStart: order != undefined ? order.deliverySchedulerStart : '',
            deliverySchedulerEnd: order != undefined ? order.deliverySchedulerEnd : '',
            observations: order != undefined ? order.observations : '',
            pools: pool != undefined ? pool.fabricationName : '',
            colors : color !=undefined ? color.name : ''
        }
        const { id, idOrder, orderCode, pools, colors, orderDate, deliveryDate, deliverySchedulerStart, deliverySchedulerEnd, observations, isStarted, idProductionStatus } = list
        const newOrderDate = this.datetimeToEuropeDate(orderDate)
        const newDeliveryDate = this.datetimeToEuropeDate(deliveryDate)

        const nObj = {
            id: id,
            idOrder: idOrder,
            orderCode: orderCode,
            pool: pools,
            orderDate: newOrderDate,
            deliveryDate: newDeliveryDate,
            deliveryTime: deliverySchedulerStart + " - " + deliverySchedulerEnd,
            observations: observations,
            isStarted: isStarted,
            idProductionStatus: idProductionStatus,
            color : colors,
             
        }
        console.log(nObj)
        return nObj
        
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM production WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const production = []
                    for (const res of result) {
                        production.push(await this.mountObj(res))
                    }

                    resolve(production)
                }
            })
        })
    }

    findByState(states) {
        // console.log(`SELECT * FROM production WHERE idProductionStatus IN (${states})`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM production WHERE idProductionStatus IN (?)', [states], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const production = []
                    for (const res of result) {
                        production.push(await this.mountList(res))
                    }

                    resolve(production)
                }
            })
        })
    }

}

module.exports = ProductionDao