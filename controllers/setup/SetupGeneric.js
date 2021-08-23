const SetupDao = require("../../dao/setup/SetupDao");

const setupDao = new SetupDao()
exports.list = async (req, res) => {

    try{
        res.json({
            ok:true,
            vendors: await setupDao.findAll() 
        })
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
}


exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await setupDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.insert = (req, res) => {
    try{
        setupDao.insert(req.body)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update =(req, res)=>{
    
    try{
        setupDao.update(req.body)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }    
}