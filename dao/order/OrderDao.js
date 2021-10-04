const Order = require("../../models/order/Order");
const GenericDao = require("../GenericDao");

//const ProductionDao = require("../production/ProductionDao");
const PoolDao = require("../pool/PoolDao");
const CustomerDao = require("../customer/CustomerDao");
const CustomerDataDao = require("../order/CustomerDataDao");
const ExtraItemDao = require("../order/ExtraItemDao");
const BaseItemDao = require("../order/BaseItemDao")
const TaxesDao = require("../setup/general/TaxDao");
const ItemDao = require("../item/ItemDao")
const CanvasDao = require("../order/CanvasDao")

class OrderDao extends GenericDao {
    constructor() {
        super(Order);
        this.ItemDao = new ItemDao
        this.PoolDao = new PoolDao()
        this.CustomerDao = new CustomerDao()
        this.CustomerDataDao = new CustomerDataDao()
        this.ExtraItemDao = new ExtraItemDao()
        this.BaseItemDao = new BaseItemDao()
        this.TaxesDao = new TaxesDao()
        this.CanvasDao = new CanvasDao()
        
    }

    async mountObj(data) {
        //const customerId = await this.CustomerDao.findById(data.customerId)
        const order = {
            ...data,
            customerData: await this.CustomerDataDao.findByOrderId(data.id),
            extraItems: await this.ExtraItemDao.findByOrderId(data.id),
            baseItems : await this.BaseItemDao.findByOrderId(data.id),
            orderDate : this.datetimeToDate(data.orderDate),
            deliveryDate : this.datetimeToDate(data.deliveryDate),
            idPool: {id:data.idPool, name:(await this.PoolDao.findPoolNameBy(data.idPool))} ,
            idTax : {id:data.idTax, name: (await this.TaxesDao.findTaxNameBy(data.idTax))},
            idCustomer : {id:data.idCustomer, comercialName: (await this.CustomerDao.findCustomerNameBy(data.idCustomer))},
             canvasItems : await this.CanvasDao.findByOrderId(data.id),
        }
        let order2 = new Order(order)
        order2 = {
            ...order2,
            deliveryAddress: await this.CustomerDataDao.findOneFieldById("deliveryAddress",data.id),
            phone: await this.CustomerDataDao.findOneFieldById("phone",data.id),
            email: await this.CustomerDataDao.findOneFieldById("email",data.id)
            
        }
        return order2
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