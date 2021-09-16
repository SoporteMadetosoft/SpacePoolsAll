const Order = require("../../models/order/Order");
const GenericDao = require("../GenericDao");

//const ProductionDao = require("../production/ProductionDao");
//const PoolDao = require("../pool/PoolDao");
const CustomerDao = require("../customer/CustomerDao");
const CustomerDataDao = require("../order/CustomerDataDao");
const ExtraItemDao = require("../order/ExtraItemDao");
const BaseItemDao = require("../order/BaseItemDao")
const TaxesDao = require("../setup/general/TaxDao");

class OrderDao extends GenericDao {
    constructor() {
        super(Order);
        //this.ProductionDao = new ProductionDao()
        //this.PoolDao = new PoolDao()
        this.CustomerDao = new CustomerDao()
        this.CustomerDataDao = new CustomerDataDao()
        this.ExtraItemDao = new ExtraItemDao()
        this.BaseItemDao = new BaseItemDao()
        this.TaxesDao = new TaxesDao()
        
    }

    async mountObj(data) {
        //const customerId = await this.CustomerDao.findById(data.customerId)
//     console.log(data)
        const order = {
            ...data,
            //production: await this.ProductionDao.findByOrderId(data.id),
            customerData: await this.CustomerDataDao.findByOrderId(data.id),
            extraItems: await this.ExtraItemDao.findByOrderId(data.id),
            orderDate : this.datetimeToDate(data.orderDate),
            deliveryDate : this.datetimeToDate(data.deliveryDate),
            baseItems : await this.BaseItemDao.findByOrderId(data.is),
            //idPool: await this.PoolDao.findById(data.idPool)
            idTax : await this.TaxesDao.findById(data.idTax)
        }
        console.log(order)
        return new Order(order)
    }

    async mountList(data) {
        let customer = await this.CustomerDao.findCustomer(data.idCustomer);
        const list = {
            ...data,
            customerName:  customer != undefined ? customer.comercialName : 'p',
            customerPhone: customer != undefined ? customer.phone : 'p',
            customerEmail: customer != undefined ? customer.email : 'p',

        }        

        const { id, orderCode, customerName, customerPhone, customerEmail, orderDate, deliverySchedulerStart, deliverySchedulerEnd, deliveryDate, price } = list
        
        const newOrderDate = this.datetimeToEuropeDate(orderDate)
        const newDliveryDate = this.datetimeToEuropeDate(deliveryDate)

        const nObj = {id:id, deliveryTime: deliverySchedulerStart+" - "+deliverySchedulerEnd, orderCode: orderCode, customerName: customerName, customerPhone: customerPhone, customerEmail: customerEmail, orderDate: newOrderDate, deliveryDate:newDliveryDate, price:price }
     
        return nObj
    }  

    findOrderById(id){
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders WHERE Id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result[0])
                }
            })
        })
    }

    findActiveOrders(){
        return new Promise((resolve, reject) => {
            this.db.query('SELECT id FROM orders WHERE state = 2', (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    let objList = []
                    for (const res of result) {
                        objList.push(res.id)
                    }
                   
                    resolve(objList)
                }
            })
        })
    }

}

module.exports = OrderDao