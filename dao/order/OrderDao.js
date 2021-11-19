const Order = require("../../models/order/Order");
const GenericDao = require("../GenericDao");

const PoolDao = require("../pool/PoolDao");
const CustomerDao = require("../customer/CustomerDao");
const CustomerDataDao = require("../order/CustomerDataDao");
const ExtraItemDao = require("../order/ExtraItemDao");
const BaseItemDao = require("../order/BaseItemDao")
const TaxesDao = require("../setup/general/TaxDao");
const CanvasDao = require("../order/CanvasDao");
const ExtraItemColorDao = require("./ExtraItemColorDao");
const ColorsDao = require("../setup/item/ColorsDao");
const BaseItemColorDao = require("./BaseItemColorDao");
const AlertDao = require("../alert/AlertDao");

class OrderDao extends GenericDao {
    constructor() {
        super(Order);
        this.PoolDao = new PoolDao()
        this.CustomerDao = new CustomerDao()
        this.CustomerDataDao = new CustomerDataDao()
        this.ExtraItemDao = new ExtraItemDao()
        this.ExtraItemColorDao = new ExtraItemColorDao()
        this.BaseItemDao = new BaseItemDao()
        this.BaseItemColorDao = new BaseItemColorDao()
        this.TaxesDao = new TaxesDao()
        this.CanvasDao = new CanvasDao()
        this.ColorsDao = new ColorsDao()
        this.AlertDao = new AlertDao()
    }

    async mountObj(data) {
        //const customerId = await this.CustomerDao.findById(data.customerId)
        const order = {
            ...data,
            customerData: await this.CustomerDataDao.findByOrderId(data.id),
            extraItems: await this.ExtraItemDao.getItemsByTypeAndOrder(data.id, 2),
            extraItemColors: await this.ExtraItemColorDao.getItemsByTypeAndOrder(data.id, 2),
            extraRaws: await this.ExtraItemDao.getItemsByTypeAndOrder(data.id, 1),
            extraRawColors: await this.ExtraItemColorDao.getItemsByTypeAndOrder(data.id, 1),
            baseItems: await this.BaseItemDao.findByOrderId(data.id),
            baseItemColors: await this.BaseItemColorDao.findByOrderId(data.id),
            orderDate: this.datetimeToDate(data.orderDate),
            productionDate: this.datetimeToDate(data.productionDate),
            deliveryDate: this.datetimeToDate(data.deliveryDate),
            idPool: { id: data.idPool, fabricationName: (await this.PoolDao.findPoolNameBy(data.idPool)) },
            idTax: { id: data.idTax, name: (await this.TaxesDao.findTaxNameBy(data.idTax)) },
            idCustomer: { id: data.idCustomer, comercialName: (await this.CustomerDao.findCustomerNameBy(data.idCustomer)) },
            canvasItems: await this.CanvasDao.findByOrderId(data.id),
            idColor: { id: data.idColor, name: (await this.ColorsDao.findColorNameBy(data.idColor)) }
        }

        let order2 = new Order(order)
        order2 = {
            ...order2,
            deliveryAddress: await this.CustomerDataDao.findOneFieldById("deliveryAddress", data.id),
            phone: await this.CustomerDataDao.findOneFieldById("phone", data.id),
            email: await this.CustomerDataDao.findOneFieldById("email", data.id)

        }
        return order2
    }

    async mountList(data) {
        let customer = await this.CustomerDao.findCustomer(data.idCustomer);

        const list = {
            ...data,

            customerName: customer !== undefined ? customer.comercialName : '',
            customerPhone: customer !== undefined ? customer.phone : '',
            customerEmail: customer !== undefined ? customer.email : '',

        }

        const { id, orderCode, customerName, customerPhone, customerEmail, orderDate, deliverySchedulerStart, deliverySchedulerEnd, deliveryDate, price, state, idCustomer } = list

        const newOrderDate = this.datetimeToEuropeDate(orderDate)
        const newDliveryDate = this.datetimeToEuropeDate(deliveryDate)

        const nObj = {
            id: id,
            deliveryTime: deliverySchedulerStart + " - " + deliverySchedulerEnd,
            orderCode: orderCode,
            customerName: customerName,
            customerPhone: customerPhone,
            customerEmail: customerEmail,
            orderDate: newOrderDate,
            deliveryDate: newDliveryDate,
            price: price,
            state: state,
            idProductionStatus: await this.getProductionState(data.id),
            idCustomer: idCustomer
        }
        return nObj
    }

    findOrderById(id) {
        // console.log(`SELECT * FROM orders WHERE id = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    }

    findActiveOrders() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT id FROM orders WHERE state = 0', (err, result) => {
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

    updateItemStock(id) {
        // console.log(`UPDATE orders SET state = 1 WHERE id = ${id}`)
        return new Promise(async (resolve, reject) => {
            await this.db.query('SELECT * FROM `orders_base_items` WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    for (const res of result) {
                        await this.BaseItemDao.ItemDao.updateStock('-', res['idItem'], res['quantity'])
                    }
                }
            })
            await this.db.query('SELECT * FROM `orders_base_item_colors` WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    for (const res of result) {
                        console.log(res['quantity'])
                        const resta = res['quantity']
                        await this.BaseItemColorDao.ItemsColorsDao.updateStock('-', res['idItem'], res['idColor'], resta )
                    }
                }
            })
            await this.db.query('SELECT * FROM `orders_extra_items` WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    for (const res of result) {
                        await this.ExtraItemDao.ItemDao.updateStock('-', res['idItem'], res['quantity'])
                    }
                }
            })
            await this.db.query('SELECT * FROM `orders_extra_item_colors` WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    for (const res of result) {
                        await this.ExtraItemColorDao.ItemsColorsDao.updateStock('-', res['idItem'], res['idColor'], res['quantity'])
                    }
                }
            })
            resolve('')
        })
    }

    updateOrderState(id) {
        // console.log(`UPDATE orders SET state = 1 WHERE id = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('UPDATE orders SET state = 1 WHERE id = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    await this.updateItemStock(id)
                    resolve('')
                }
            })
        })
    }
    getProductionState(id) {
        // console.log(`UPDATE orders SET state = 1 WHERE id = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT idProductionStatus FROM production WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0].idProductionStatus)
                }
            })
        })
    }

    validarOrderPoolProduction(date, pool) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT COUNT(id) as numProductions FROM production p WHERE p.idOrder IN (SELECT id FROM orders WHERE productionDate = ? AND idPool = ?) AND p.idProductionStatus < 5', [date, pool], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const { numProductions } = result[0]
                    const { simultaneousFabrications } = await this.PoolDao.findPoolById(pool)

                    let ok = true
                    if (numProductions === simultaneousFabrications) {
                        ok = false
                    }
                    resolve(ok)
                }
            })
        })
    }

    comprobarStockMinimo(idOrder) {
        return new Promise(async (resolve, reject) => {
            let stock
            let minimumStock
            let reserved
            let has

                // Items extra y base sin color
            const baseItems = await this.BaseItemDao.findByOrderId(idOrder)
            const extraItems = await this.ExtraItemDao.findByOrderId(idOrder)

            
            baseItems.map(async (item) => {
                stock = await this.BaseItemDao.ItemDao.findOneFieldById("stock", item.idItem)
                minimumStock = await this.BaseItemDao.ItemDao.findOneFieldById("minimumStock", item.idItem)
                reserved = await this.BaseItemDao.ItemDao.findReservedStock(item.idItem)

                if ((stock - reserved) <= minimumStock) {

                    has = await this.AlertDao.hasItemAlert(item.idItem)
                    if (has === false) {
                        await this.AlertDao.insert({
                            message: `El artículo ${item.name} se está quedando sin stock ( ${stock - reserved} / ${minimumStock} )`,
                            idItem: item.idItem,
                            isDone: 0
                        })
                    }
                }
            })

            extraItems.map(async (item) => {
                // console.log(item)
                stock = await this.ExtraItemDao.ItemDao.findOneFieldById("stock", item.idItem.id)
                minimumStock = await this.ExtraItemDao.ItemDao.findOneFieldById("minimumStock", item.idItem.id)
                reserved = await this.ExtraItemDao.ItemDao.findReservedStock(item.idItem.id)

                if ((stock - reserved) <= minimumStock) {
                    has = await this.AlertDao.hasItemAlert(item.idItem.id)
                    if (has === false) {
                        await this.AlertDao.insert({
                            message: `El artículo ${item.idItem.name} se está quedando sin stock ( ${stock - reserved} / ${minimumStock} )`,
                            idItem: item.idItem.id,
                            isDone: 0
                        })
                    }
                }
            })

            // Items extra y base con color
            const baseItemColors = await this.BaseItemColorDao.findByOrderId(idOrder)
            const extraItemColors = await this.ExtraItemColorDao.findByOrderId(idOrder)

            baseItemColors.map(async (item) => {
                stock = await this.BaseItemColorDao.ItemsColorsDao.totalStock(item.idItem)
                minimumStock = await this.BaseItemColorDao.ItemsColorsDao.findOneFieldById("minimumStock", item.idItem)
                reserved = await this.BaseItemColorDao.ItemsColorsDao.findReservedStock(item.idItem)
                if ((stock.stock - reserved) <= minimumStock) {
                    has = await this.AlertDao.hasItemAlert(item.idItem.id)
                    if (has === false) {
                        await this.AlertDao.insert({
                            message: `El artículo ${item.idItem.name} se está quedando sin stock ( ${stock.stock - reserved} / ${minimumStock} )`,
                            idItem: item.idItem.id,
                            isDone: 0
                        })
                    }
                }
            })

            extraItemColors.map(async (item) => {
                stock = await this.ExtraItemColorDao.ItemsColorsDao.totalStock(item.idItem)
                minimumStock = await this.ExtraItemColorDao.ItemsColorsDao.findOneFieldById("minimumStock", item.idItem)
                reserved = await this.ExtraItemColorDao.ItemsColorsDao.findReservedStock(item.idItem)

                if ((stock.stock - reserved) <= minimumStock) {
                    has = await this.AlertDao.hasItemAlert(item.idItem.id)
                    if (has === false) {
                        await this.AlertDao.insert({
                            message: `El artículo ${item.idItem.name} se está quedando sin stock ( ${stock.stock - reserved} / ${minimumStock} )`,
                            idItem: item.idItem.id,
                            isDone: 0
                        })
                    }
                }
            })
            resolve('')
        })
    }
}



module.exports = OrderDao