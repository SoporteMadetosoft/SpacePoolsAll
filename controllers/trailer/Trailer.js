
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

exports.select = async (req, res) => {

    try{
        res.json({
            ok:true,
            data: await trailerDao.getSelect() 
        })
    }catch(error){
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
        /** INSERT TRAILER */
        const insert = await trailerDao.insert(req.body.form)
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
        /**UPDATE TRAILER */
        trailerDao.update(req.body.form)
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