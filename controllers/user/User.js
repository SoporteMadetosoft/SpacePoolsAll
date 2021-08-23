const UserDao = require('../../dao/user/UserDao')

const userDao = new UserDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await userDao.findAll()
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
            data: await userDao.getSelect() 
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
            data: await userDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await userDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT USER **/
       userDao.insert(req.body.formData.base)
        
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        /** UPDATE USER **/
        userDao.update(req.body.formData.base)
    
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}