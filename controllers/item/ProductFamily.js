const ProductFamilyDao = require('../../dao/item/ProductFamilyDao')

const productFamilyDao = new ProductFamilyDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await productFamilyDao.findAll()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}


exports.select = async (req, res) => {
    const treeData = await productFamilyDao.findAllFamily(req.body.idNode)
    try {
        res.json({
            ok: true,
            data: treeData
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
            data: await productFamilyDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await productFamilyDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT PRODUCT FAMILY */
        const insert = await productFamilyDao.insert(req.body.form)


        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        /** UPDATE PRODUCT FAMILY */
        const familia = req.body.form
        if (familia.id === familia.parent) {
            return res.status(500).send()
        }
        if (familia.parent === null) {
            productFamilyDao.setParentNullById(familia.id)
            delete familia.parent
        }

        productFamilyDao.update(familia)


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
            data: await  productFamilyDao.findAutoincrementID()
         })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}