const PurchaseDao = require('../../dao/purchase/PurchaseDao')
const purchaseDao = new PurchaseDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await purchaseDao.findAll()
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
            data: await purchaseDao.getSelect() 
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
            data: await purchaseDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await purchaseDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT PURCAHSE */
        const insert = await purchaseDao.insert(req.body.form)
        /** INSERT ITEM */
        req.body.repairs.forEach(element => {
            element.purchaseId = insert.insertId
            itemDao.insert(element)
        });

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        /** UPDATE PURCHASE */
        purchaseDao.update(req.body.form)
        /** UPDATE ITEM */
        req.body.formData.repairs.forEach(element => {
            itemDao.update(element)
        })
       
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}