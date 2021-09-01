const CategoryDao = require('../../../dao/setup/customer/CustomerCategoryDao')
const Category = require('../../../models/setup/customer/CustomerCategory')

const categoryDao = new CategoryDao(Category)
exports.list = async (req, res) => {

    try{
        res.json({
            ok:true,
            data: await categoryDao.findAll() 
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
            data: await categoryDao.getSelect() 
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
            data: await categoryDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await categoryDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.insert = (req, res) => {
    try{
        categoryDao.insert(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update =(req, res)=>{
    
    try{
        categoryDao.update(req.body.form)
        res.json({ok: true})
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }    
}