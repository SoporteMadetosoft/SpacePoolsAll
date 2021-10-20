const Delivery = require("../../models/delivery/Delivery");
const GenericDao = require("../GenericDao");

const CustomerDao = require("../customer/CustomerDao");
const StatusDao = require("../global/StatusDao");
const OrderDao = require("../order/OrderDao");
const CustomerDataDao = require("../order/CustomerDataDao");
const CarrierDao = require("../carrier/CarrierDao");

class DeliveryDao extends GenericDao {
    constructor() {
        super(Delivery);
        this.StatusDao = new StatusDao()
        this.CustomerDao = new CustomerDao()
        this.OrderDao = new OrderDao()
        this.CustomerDataDao = new CustomerDataDao()
        this.CarrierDao = new CarrierDao()
    }

    async mountObj(data) {
        const carrier = await this.CarrierDao.findById(data.idCarrier);
        const order = await this.OrderDao.mountObj(await this.OrderDao.findOrderById(data.idOrder));
        const pool = await this.OrderDao.PoolDao.findById(order.idPool.id);

        const obj = {
            ...data,
            orderData: order,
            orderDate: this.datetimeToEuropeDate(new Date(order.orderDate)),
            productionDate: this.datetimeToEuropeDate(new Date(order.productionDate)),
            deliveryDate: this.datetimeToEuropeDate(new Date(order.deliveryDate)),
            idPool: pool,
            idCarrier: carrier
        }

        return obj
    }


    async getGPS(address) {
        const replacedAddress = address.split(' ').join('+');

        return `https://maps.google.com/?q=${replacedAddress}`
    }

    async mountList(data) {
        const customer = await this.CustomerDao.findById(data.idCustomer);
        const carrier = await this.CarrierDao.findById(data.idCarrier);
        const deliveryAddress = await this.CustomerDataDao.findOneFieldById("deliveryAddress", data.idOrder)

        const { deliverySchedulerStart, deliverySchedulerEnd, deliveryDate } = await this.OrderDao.findById(data.idOrder)

        const deliveryStart = `${this.datetimeToEuropeDate(new Date(deliveryDate))} ${deliverySchedulerStart}`
        const deliveryEnd = `${this.datetimeToEuropeDate(new Date(deliveryDate))} ${deliverySchedulerEnd}`
        const idStatus = await this.StatusDao.findById(data.idStatus)

        const list = {
            id: data.id,
            idOrder: data.idOrder,
            gps: await this.getGPS(deliveryAddress),
            deliveryStart,
            deliveryEnd,
            Customer: customer !== undefined ? customer.comercialName : '',
            idCustomer: customer !== undefined ? customer.id : '',
            idStatus: idStatus !== undefined ? idStatus.id : '',
            carrier: carrier !== undefined ? carrier.name : ''
        }
        return list
    }

}
module.exports = DeliveryDao