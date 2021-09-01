const Order = require("../../models/order/Order");
const GenericDao = require("../GenericDao");

const ProductionDao = require("../production/ProductionDao");
const PoolDao = require("../pool/PoolDao");
const CustomerDao = require("../customer/CustomerDao");
const CustomerDataDao = require("../order/CustomerDataDao");
const ExtraItemDao = require("../order/ExtraItemDao");


class OrderDao extends GenericDao {
    constructor() {
        super(Order);
        this.ProductionDao = new ProductionDao()
        this.PoolDao = new PoolDao()
        this.CustomerDao = new CustomerDao()
        this.CustomerDataDao = new CustomerDataDao()
        this.ExtraItemDao = new ExtraItemDao()
    }

    async mountObj(data) {
        //const customerId = await this.CustomerDao.findById(data.customerId)
        const order = {
            ...data,
            production: await this.ProductionDao.findByOrderId(data.id),
            customerData: await this.CustomerDataDao.findByOrderId(data.id),
            extraItems: await this.ExtraItemDao.findByOrderId(data.id),
            poolId: await this.PoolDao.findById(data.poolid)
        }
        return new Order(order)
    }

    async mountList(data) {
        let customer = await this.CustomerDao.findCustomer(data.customerId);
        const list = {
            ...data,
            customerName: customer != undefined ? customer.comercialName : 'p',
            customerPhone: customer != undefined ? customer.phone : 'p',
            customerEmail: customer != undefined ? customer.email : 'p',

        }
        const { orderCode, customerName, customerPhone, customerEmail, orderDate, deliverySchedulerStart } = list
        const nObj = { orderCode: orderCode, customerName: customerName, customerPhone: customerPhone, customerEmail: customerEmail, orderDate: orderDate, deliverySchedulerStart: deliverySchedulerStart }
        return nObj
    }

}

module.exports = OrderDao