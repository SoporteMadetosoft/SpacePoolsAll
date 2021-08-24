const PlaceDao = require("../../../dao/setup/item/PlaceDao")
const Place = require("../../../models/setup/Item/Place")

const placeDao = new PlaceDao(Place)
exports.list = async (req, res) => {

    try{
        res.json({
            ok:true,
            data: await placeDao.findAll() 
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
            data: await placeDao.getSelect() 
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
            data: await placeDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await placeDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.insert = (req, res) => {
    try{
        placeDao.insert(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update =(req, res)=>{
    
    try{
        placeDao.update(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }    
}