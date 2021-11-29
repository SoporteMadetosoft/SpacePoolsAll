const DeliveryDao = require('../../dao/delivery/DeliveryDao')

const deliveryDao = new DeliveryDao()


exports.list = async (req, res) => {
    try {
        const { idUser } = req.body

        res.json({
            ok: true,
            data: await deliveryDao.findDeliveryByUser(idUser)
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
exports.insert = async (req, res) => {
    try {

        const delivery = req.body.form
        await deliveryDao.insert(delivery)


        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {
    try {

        const delivery = req.body.form
        await deliveryDao.update(delivery)

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}