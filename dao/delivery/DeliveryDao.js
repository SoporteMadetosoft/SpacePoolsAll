const Delivery = require("../../models/delivery/Delivery");
const GenericDao = require("../GenericDao");

const CustomerDao = require("../customer/CustomerDao");
const StatusDao = require("../global/StatusDao");
const OrderDao = require("../order/OrderDao");
const CustomerDataDao = require("../order/CustomerDataDao");
const CarrierDao = require("../carrier/CarrierDao");
const VehicleDao = require("../vehicles/VehicleDao");

class DeliveryDao extends GenericDao {
    constructor() {
        super(Delivery);
        this.StatusDao = new StatusDao()
        this.CustomerDao = new CustomerDao()
        this.OrderDao = new OrderDao()
        this.CustomerDataDao = new CustomerDataDao()
        this.CarrierDao = new CarrierDao()
        this.VehicleDao = new VehicleDao()
    }

    async mountObj(data) {
        const carrier = await this.CarrierDao.findById(data.idCarrier);
        const order = await this.OrderDao.mountObj(await this.OrderDao.findOrderById(data.idOrder));
        const pool = await this.OrderDao.PoolDao.findById(order.idPool.id);
        const vehicle = await this.VehicleDao.findByCarrierId(data.idCarrier);
        const customer = await this.CustomerDao.findById(data.idCustomer);

        const customerData = order.customerData
        const vehiclePlate = vehicle.plate
        const trailerPlate = vehicle.idTrailer.plate
        const poolColor = order.idColor.name

        delete order.customerData
        delete order.idCustomer
        delete order.canvasItems
        delete order.idPool

        const obj = {
            ...data,
            customer: {
                name: customer.comercialName,
                origin: customer.idCustomerOrigin,
                language: customer.idLanguage,
                customerData
            },
            orderData: order,
            orderDate: this.datetimeToEuropeDate(new Date(order.orderDate)),
            productionDate: this.datetimeToEuropeDate(new Date(order.productionDate)),
            deliveryDate: this.datetimeToEuropeDate(new Date(order.deliveryDate)),
            pool: {
                name: pool.fabricationName,
                nameEuropa: pool.nameEuropa,
                nameSpace: pool.nameSpace,
                nameSociedad: pool.nameSociedad,
                nameHydryus: pool.nameHydryus,
                color: poolColor
            },
            carrier: {
                name: carrier.name,
                NIF: carrier.NIF
            },
            vehiclePlate,
            trailerPlate
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

    comprobarCarrier(idUser) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT id FROM carriers WHERE idUser = ?', [idUser], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let isCarrier = false
                    for (const res of result) {
                        isCarrier = true
                    }
                    resolve(isCarrier)
                }
            })
        })
    }

    async findDeliveryByUser(idUser) {
        const isCarrier = await this.comprobarCarrier(idUser)
        if (isCarrier === true) {
            return new Promise((resolve, reject) => {
                this.db.query('SELECT * FROM delivery WHERE idCarrier = (SELECT id FROM carriers WHERE idUser = ?)', [idUser], async (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        let objList = []
                        for (const res of result) {
                            objList.push(await this.mountList(res))
                        }
                        resolve(objList)
                    }
                })
            })
        } else {
            return await this.findAll()
        }
    }

}
module.exports = DeliveryDao