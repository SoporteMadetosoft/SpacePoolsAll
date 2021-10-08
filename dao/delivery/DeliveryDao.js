const Delivery = require("../../models/delivery/Delivery");
const GenericDao = require("../GenericDao");

const CustomerDao = require("../customer/CustomerDao");
const StatusDao = require("../global/StatusDao");
const OrderDao = require("../order/OrderDao");
const CustomerDataDao = require("../order/CustomerDataDao");


class DeliveryDao extends GenericDao {
    constructor() {
        super(Delivery);
        this.StatusDao = new StatusDao()
        this.CustomerDao = new CustomerDao()
        this.OrderDao = new OrderDao()
        this.CustomerDataDao = new CustomerDataDao()
    }

    async mountObj(data) {
        const order = await this.OrderDao.findById(data.idOrder);

        const obj = {
            ...data,
            ...order
        }

        return obj
    }


    async getGPS(address) {
        const replacedAddress = address.split(' ').join('+');

        return `https://maps.google.com/?q=${replacedAddress}`
    }

    async mountList(data) {
        const customer = await this.CustomerDao.findById(data.idCustomer);
        const deliveryAddress = await this.CustomerDataDao.findOneFieldById("deliveryAddress", data.idOrder)

        const { deliverySchedulerStart, deliverySchedulerEnd, deliveryDate } = await this.OrderDao.findById(data.idOrder);
        const deliveryStart = `${deliveryDate} ${deliverySchedulerStart}`
        const deliveryEnd = `${deliveryDate} ${deliverySchedulerEnd}`
        const idStatus = await this.StatusDao.findById(data.idStatus)

        const list = {
            id: data.id,
            idOrder: data.idOrder,
            gps: await this.getGPS(deliveryAddress),
            deliveryStart,
            deliveryEnd,
            Customer: customer !== undefined ? customer.comercialName : '',
            idCustomer: customer !== undefined ? customer.id : '',
            idStatus: idStatus !== undefined ? idStatus.id : ''
        }
        return list
    }

}
module.exports = DeliveryDao