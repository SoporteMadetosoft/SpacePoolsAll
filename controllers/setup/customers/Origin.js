const OriginDao = require('../../../dao/setup/customer/CustomerOriginDao')
const Origin = require('../../../models/setup/customer/CustomerOrigin')

const origin = new OriginDao(Origin)
exports.list = async (req, res) => {

    try{
        res.json({
            ok:true,
            data: await origin.findAll() 
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
            data: await origin.getSelect() 
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
            data: await origin.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await origin.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.insert = (req, res) => {
    try{
        origin.insert(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update =(req, res)=>{
    
    try{
        origin.update(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }    
}