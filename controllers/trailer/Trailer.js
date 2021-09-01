
const RepairDao = require('../../dao/trailer/RepairDao')
const TrailerDao = require('../../dao/trailer/TrailerDao')

const trailerDao = new TrailerDao()
const repairDao = new RepairDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await trailerDao.findAll()
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
            data: await trailerDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await trailerDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {

        /** INSERT CARRIER */
        const trailer = req.body.form
        delete trailer.documents

        await trailerDao.insert(trailer)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {

        /** INSERT CARRIER */
        const trailer = req.body.form
        delete trailer.documents

        await trailerDao.update(trailer)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}