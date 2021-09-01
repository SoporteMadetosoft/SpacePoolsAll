const PayDayDao = require('../../dao/global/PayDayDao')
const PayDay = require('../../models/global/PayDay')

const paydayDao = new PayDayDao(PayDay)
exports.list = async (req, res) => {

    try{
        res.json({
            ok:true,
            data: await paydayDao.findAll() 
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
            data: await paydayDao.getSelect() 
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
            data: await paydayDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await paydayDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.insert = (req, res) => {
    try{
        paydayDao.insert(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update =(req, res)=>{
    
    try{
        paydayDao.update(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }    
}