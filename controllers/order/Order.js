const OrderDao = require('../../dao/order/OrderDao')
const ExtraItemDao = require('../../dao/order/ExtraItemDao')
const CustomerDataDao = require('../../dao/order/CustomerDataDao')
const ProductionDao = require('../../dao/production/ProductionDao')
const BaseItemsDao = require('../../dao/order/BaseItemDao')
const CanvasDao = require('../../dao/order/CanvasDao')

const orderDao = new OrderDao()
const productionDao = new ProductionDao()
const extraItemDao = new ExtraItemDao()
const customerDataDao = new CustomerDataDao()
const baseItemsDao = new BaseItemsDao()
const canvasDao = new CanvasDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await orderDao.findAll()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.listByID = async (req, res) => {
    const id = parseInt(req.body.id, 10)
    try {
        res.json({
            ok: true,
            data: await orderDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await orderDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        // /** INSERT ORDER */
        // const insert = await orderDao.insert(req.body.form)
        // /** INSERT PODUCTION */
        // req.body.production.forEach(element => {
        //     element.idOrder = insert.insertId
        //     productionDao.insert(element)
        // });
        // /** INSERT EXTRA ITEMS */
        // req.body.extraItems.forEach(element => {
        //     element.idOrder = insert.insertId
        //     extraItemDao.insert(element)
        // });
        // /** INSERT CUSTOMER DATA */
        // req.body.customerData.forEach(element => {
        //     element.idOrder = insert.insertId
        //     customerDataDao.insert(element)
        // });
        // /** INSERT BASE ITEM */
        
     const order = req.body.form
     const production = req.body.form.production
     const extraItems = req.body.form.extraItems
     const customerData = req.body.form.customerData
     const baseItems = req.body.form.baseItems
     const canvas = req.body.form.canvas

     delete order.production
     delete order.extraItems
     delete order.customerData
     delete order.canvas
     delete order.baseItems
     const insert = await orderDao.insert(order)

     const customerData2 = {
        ...customerData,
        idOrder : insert.insertId
     }
     await customerDataDao.insert(customerData2)

     const production2 = {
         ...production,
         idOrder : insert.insertId
     }
     await productionDao.insert(production2)
     orderDao.multipleAccess(extraItems, orderDao.ExtraItemDao, insert.insertId, 'idOrder')
     orderDao.multipleAccess(baseItems, orderDao.BaseItemDao, insert.insertId, 'idOrder')
     orderDao.multipleAccess(canvas, canvasDao, insert.insertId, 'idOrder')
     
     res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
      //  /** UPDATE ORDER */
      //  orderDao.update(req.body.form)
      //  /** UPDATE PRODUCTION*/
      //  req.body.formData.production.forEach(element => {
      //      productionDao.update(element)
      //  })
      //  /** UPDATE EXTRA ITEMS */
      //  req.body.formData.extraItems.forEach(element => {
      //      extraItemDao.update(element)
      //  })
      //  /** UPDATE CUSTOMER DATA */
      //  req.body.formData.customerData.forEach(element => {
      //      customerDataDao.update(element)
      //  })
      //  /** INSERT CANVAS */

      const order = req.body.form
      const production = req.body.form.production
      const extraItems = req.body.form.extraItems
      const customerData = req.body.form.customerData
      const baseItems = req.body.form.baseItems
      const canvas = req.body.form.canvas
 
      delete order.production
      delete order.extraItems
      delete order.customerData
      delete order.canvas
      delete order.baseItems

      orderDao.update(order)
 
      const customerData2 = {
         ...customerData,
         idOrder : order.id
      }
      customerDataDao.update(customerData2)
 
      const production2 = {
          ...production,
          idOrder : order.id
      }
      productionDao.update(production2)
      orderDao.multipleAccess(extraItems, orderDao.ExtraItemDao, order.id, 'idOrder')
      orderDao.multipleAccess(baseItems, orderDao.BaseItemDao, order.id, 'idOrder')
      orderDao.multipleAccess(canvas, canvasDao, order.id, 'idOrder')
      

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}