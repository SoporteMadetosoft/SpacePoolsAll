const OrderDao = require('../../dao/order/OrderDao')
const ExtraItemDao = require('../../dao/order/ExtraItemDao')
const CustomerDataDao = require('../../dao/order/CustomerDataDao')
const ProductionDao = require('../../dao/production/ProductionDao')

const orderDao = new OrderDao()
const productionDao = new ProductionDao()
const extraItemDao = new ExtraItemDao()
const customerDataDao = new CustomerDataDao()


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
        /** INSERT ORDER */
        const insert = await orderDao.insert(req.body.form)
        /** INSERT PODUCTION */
        req.body.production.forEach(element => {
            element.idOrder = insert.insertId
            productionDao.insert(element)
        });
        /** INSERT CUSTOMER DATA */
        req.body.extraItems.forEach(element => {
            element.idOrder = insert.insertId
            extraItemDao.insert(element)
        });
        /** INSERT EXTRA ITEMS */
        req.body.customerData.forEach(element => {
            element.idOrder = insert.insertId
            customerDataDao.insert(element)
        });


        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        /** UPDATE ORDER */
        orderDao.update(req.body.form)
        /** UPDATE PRODUCTION*/
        req.body.formData.production.forEach(element => {
            productionDao.update(element)
        })
        /** UPDATE CUSTOMER DATA */
        req.body.formData.extraItems.forEach(element => {
            extraItemDao.update(element)
        })
        /** UPDATE EXTRA ITEMS */
        req.body.formData.customerData.forEach(element => {
            customerDataDao.update(element)
        })

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}