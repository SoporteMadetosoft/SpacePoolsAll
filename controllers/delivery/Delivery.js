const DeliveryDao = require('../../dao/delivery/DeliveryDao')

const deliveryDao = new DeliveryDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await deliveryDao.findAll()
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
            data: await deliveryDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.update = async (req, res) => {
    try {

        /** INSERT CUSTOMER */
        const form = req.body.form

        deliveryDao.update(form)

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
