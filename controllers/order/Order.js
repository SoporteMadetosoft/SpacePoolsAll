const OrderDao = require('../../dao/order/OrderDao')
const ExtraItemDao = require('../../dao/order/ExtraItemDao')
const CustomerDataDao = require('../../dao/order/CustomerDataDao')
const BaseItemsDao = require('../../dao/order/BaseItemDao')
const CanvasDao = require('../../dao/order/CanvasDao')

const orderDao = new OrderDao()
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

exports.listCItems = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        res.json({
            ok: true,
            data: await canvasDao.findByOrderId(id)
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

        const order = req.body.form
        const production = req.body.form.production
        const extraItems = req.body.form.extraItems
        const extraRaws = req.body.form.extraItems
        const customerData = req.body.form.customerData
        const baseItems = req.body.form.baseItems
        const canvas = req.body.form.canvas

        delete order.production
        delete order.extraItems
        delete order.extraRaws
        delete order.customerData
        delete order.canvas
        delete order.baseItems
        const insert = await orderDao.insert(order)

        const customerData2 = {
            ...customerData,
            idOrder: insert.insertId
        }
        await customerDataDao.insert(customerData2)

        orderDao.multipleAccess(extraItems, orderDao.ExtraItemDao, insert.insertId, 'idOrder')
        orderDao.multipleAccess(extraRaws, orderDao.ExtraItemDao, insert.insertId, 'idOrder')
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
            idOrder: order.id
        }
        customerDataDao.update(customerData2)

        orderDao.multipleAccess(extraItems, orderDao.ExtraItemDao, order.id, 'idOrder')
        orderDao.multipleAccess(baseItems, orderDao.BaseItemDao, order.id, 'idOrder')
        orderDao.multipleAccess(canvas, canvasDao, order.id, 'idOrder')


        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}


exports.findNId = async (req, res) => {
    try {

        res.json({
            ok: true,
            data: await orderDao.findAutoincrementID()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.switchState = async (req, res) => {

    try {
        await orderDao.updateOrderState(req.body.id)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}