const ActivityDao = require('../../../dao/setup/customer/CustomerActivityDao')
const Activity = require('../../../models/setup/customer/CustomerActivity')

const activityDao = new ActivityDao(Activity)
exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await activityDao.findAll()
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
            data: await activityDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await activityDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.insert = (req, res) => {
    try {
        activityDao.insert(req.body.form)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        activityDao.update(req.body.form)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}