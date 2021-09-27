
const CarrierDao = require('../../dao/carrier/CarrierDao')
const CarrierDocumentsDao = require('../../dao/carrier/CarrierDocumentsDao');

const carrierDao = new CarrierDao()
const carrierDocumentsDao = new CarrierDocumentsDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await carrierDao.findAll()
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
            data: await carrierDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await carrierDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT CARRIER */
        const carrier = req.body.form
        const documents = req.body.form.documents
        delete carrier.documents

        const insert = await carrierDao.insert(carrier)

        carrierDao.multipleAccess(documents, carrierDocumentsDao, insert.insertId, 'idCarrier')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {
    try {
        /**UPDATE CARRIER */
        const carrier = req.body.form
        const documents = req.body.form.documents

        delete carrier.documents

        carrierDao.update(carrier)

        carrierDao.multipleAccess(documents, carrierDocumentsDao, carrier.id, 'idCarrier')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.findNId= async (req, res) => {
    try {
       
        res.json({ 
            ok: true,
            data: await  carrierDao.findAutoincrementID()
         })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}