const OrderDao = require('../../dao/order/OrderDao')
const CustomerDataDao = require('../../dao/order/CustomerDataDao')
const CanvasDao = require('../../dao/order/CanvasDao')

const orderDao = new OrderDao()
const customerDataDao = new CustomerDataDao()
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
        const extraItems = req.body.form.extraItems
        const extraItemColors = req.body.form.extraItemColors
        const extraRaws = req.body.form.extraRaws
        const extraRawColors = req.body.form.extraRawColors
        const customerData = req.body.form.customerData
        const baseItems = req.body.form.baseItems
        const canvas = req.body.form.canvas

        delete order.production
        delete order.extraItems
        delete order.extraItemColors
        delete order.extraRaws
        delete order.extraRawColors
        delete order.customerData
        delete order.canvas
        delete order.baseItems
        delete order.extraRawColors
        delete order.extraItemColors
        
        const insert = await orderDao.insert(order)

        const customerData2 = {
            ...customerData,
            idOrder: insert.insertId
        }
        await customerDataDao.insert(customerData2)

        orderDao.multipleAccess(extraItems, orderDao.ExtraItemDao, insert.insertId, 'idOrder')
        orderDao.multipleAccess(extraItemColors, orderDao.ExtraItemColorDao, insert.insertId, 'idOrder')
        orderDao.multipleAccess(extraRaws, orderDao.ExtraItemDao, insert.insertId, 'idOrder')
        orderDao.multipleAccess(extraRawColors, orderDao.ExtraItemColorDao, insert.insertId, 'idOrder')
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
        const extraItems = req.body.form.extraItems
        const extraRaws = req.body.form.extraRaws
        const customerData = req.body.form.customerData
        const baseItems = req.body.form.baseItems
        const canvas = req.body.form.canvas

        delete order.production
        delete order.extraItems
        delete order.extraRaws
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
        orderDao.multipleAccess(extraRaws, orderDao.ExtraItemDao, order.id, 'idOrder')
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

exports.select = async (req, res) => {
    
    try {
        res.json({
            ok: true,
            data: await customerDao.findAllStatus()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.validate = async (req, res) => {
    try {
        const { productionDate, idPool } = req.body.form

        res.json({
            ok: true,
            data: await orderDao.validarOrderPoolProduction(productionDate, idPool)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}