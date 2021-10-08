
const RepairDao = require('../../dao/vehicles/RepairDao')
const VehicleDao = require('../../dao/vehicles/VehicleDao')
const VehicleDocumentsDao = require('../../dao/vehicles/VehicleDocumentsDao')

const vehicleDao = new VehicleDao()
const repairDao = new RepairDao()
const vehicleDocumentsDao = new VehicleDocumentsDao()

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
        const vehicle = req.body.form
        const documents = req.body.form.documents

        delete vehicle.documents

        const insert = await vehicleDao.insert(vehicle)

        vehicleDao.multipleAccess(documents, vehicleDocumentsDao, insert.insertId, 'idVehicle')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /**UPDATE VEHICLE */
        const vehicle = req.body.form
        const documents = req.body.form.documents

         delete vehicle.documents
         

        await vehicleDao.update(vehicle)

        vehicleDao.multipleAccess(documents, vehicleDocumentsDao, vehicle.id, 'idVehicle')

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
            data: await  vehicleDao.findAutoincrementID()
         })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}