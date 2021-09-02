const Order = require("../../models/order/Order");
const GenericDao = require("../GenericDao");

//const ProductionDao = require("../production/ProductionDao");
const PoolDao = require("../pool/PoolDao");
const CustomerDao = require("../customer/CustomerDao");
const CustomerDataDao = require("../order/CustomerDataDao");
const ExtraItemDao = require("../order/ExtraItemDao");


class OrderDao extends GenericDao {
    constructor() {
        super(Order);
        //this.ProductionDao = new ProductionDao()
        this.PoolDao = new PoolDao()
        this.CustomerDao = new CustomerDao()
        this.CustomerDataDao = new CustomerDataDao()
        this.ExtraItemDao = new ExtraItemDao()
    }

    async mountObj(data) {
        //const customerId = await this.CustomerDao.findById(data.customerId)
        const order = {
            ...data,
            //production: await this.ProductionDao.findByOrderId(data.id),
            customerData: await this.CustomerDataDao.findByOrderId(data.id),
            extraItems: await this.ExtraItemDao.findByOrderId(data.id),
            poolId: await this.PoolDao.findById(data.poolid)
        }
        return new Order(order)
    }

    async mountList(data) {
        let customer = await this.CustomerDao.findCustomer(data.customerId);
        console.log(data)
        const list = {
            ...data,
            customerName: customer != undefined ? customer.comercialName : 'p',
            customerPhone: customer != undefined ? customer.phone : 'p',
            customerEmail: customer != undefined ? customer.email : 'p',

        }
        const { orderCode, customerName, customerPhone, customerEmail, orderDate, deliverySchedulerStart, deliverySchedulerEnd, deliveryDate } = list
        const nObj = {deliveryTime: deliverySchedulerStart+" - "+deliverySchedulerEnd, orderCode: orderCode, customerName: customerName, customerPhone: customerPhone, customerEmail: customerEmail, orderDate: orderDate.getDay()+"-"+orderDate.getMonth()+"-"+orderDate.getFullYear(), deliveryDate:deliveryDate.getDay()+"-"+deliveryDate.getMonth()+"-"+deliveryDate.getFullYear() }
        console.log(nObj)
     
        return nObj
    }

    findOrderById(id){
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders WHERE Id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    //const order = []
                    //for (const centerDB of result) {
                    //    order.push(this.mountObj(centerDB))
                    //}
                    //resolve(order)

                    resolve(result[0])
                }
            })
        })
    }

}

module.exports = OrderDao