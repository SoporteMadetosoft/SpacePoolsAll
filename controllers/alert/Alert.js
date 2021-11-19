
const AlertDao = require('../../dao/alert/AlertDao')

const alertDao = new AlertDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await alertDao.findAll()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
exports.listNotification = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await alertDao.listNotification()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.update = async (req, res) => {

    try {
        const alert = req.body.form
       



        res.json({
            ok: true,
            data: await alertDao.update(alert)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
