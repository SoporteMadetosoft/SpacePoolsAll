const BrandDao = require('../../../dao/setup/vehicles/BrandDao')
const Brand = require('../../../models/setup/vehicles/VehiclesBrand')

const brandDao = new BrandDao(Brand)
exports.list = async (req, res) => {

    try{
        res.json({
            ok:true,
            data: await brandDao.findAll() 
        })
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.select = async (req, res) => {

    try{
        res.json({
            ok:true,
            data:  await brandDao.getSelect()
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
            data: await brandDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}


exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await brandDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.insert = (req, res) => {
    try{
        brandDao.insert(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update =(req, res)=>{
    
    try{
        brandDao.update(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }    
}