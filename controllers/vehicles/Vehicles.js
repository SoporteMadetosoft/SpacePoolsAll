
const RepairDao = require('../../dao/vehicles/RepairDao')
const VehicleDao = require('../../dao/vehicles/VehicleDao')

const vehicleDao = new VehicleDao()
const repairDao = new RepairDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await vehicleDao.findAll()
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
            data: await vehicleDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await vehicleDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT VEHICLE */
        const insert = await vehicleDao.insert(req.body.form)
        /**INSERT REPAIR */
        req.body.repairs.forEach(element => {
            element.idTrailer = insert.insertId
            repairDao.insert(element)
        });


        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        /**UPDATE VEHICLE */
        vehicleDao.update(req.body.form)
        /**UPDATE REPAIR */
        req.body.formData.repairs.forEach(element => {
            repairDao.update(element)
        })

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}