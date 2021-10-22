const PurchaseDao = require('../../dao/purchase/PurchaseDao')
const PurchaseItemDao = require('../../dao/purchase/PurchaseItemDao')
const purchaseDao = new PurchaseDao()
const purchaseItemDao = new PurchaseItemDao()


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
    try {
        res.json({
            ok: true,
            data: await purchaseDao.findAllStatus()
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
        const purchase = req.body.form
        const items = req.body.form.items

        delete purchase.items

        const insert = await purchaseDao.insert(purchase)

        purchaseDao.multipleAccess(items, purchaseDao.PurchaseItemDao, insert.insertId, 'idPurchase')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {
    try {
        /** UPDATE PURCHASE */
        const purchase = req.body.form
        const items = req.body.form.items

        delete purchase.items

        await purchaseDao.update(purchase)

        purchaseDao.multipleAccess(items, purchaseDao.PurchaseItemDao, purchase.id, 'idPurchase')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.verify = async (req, res) => {
    try {
        /** INSERT PURCAHSE */
        const purchase = req.body.form
        const items = req.body.form.items

        delete purchase.items

        items.forEach(async i => {
            await purchaseItemDao.sumRecived(i.id, i.recived)
            await purchaseItemDao.ItemDao.updateStock('+', i.idItem, i.recived)
        })
        // await purchaseDao.multipleAccess(items, purchaseDao.PurchaseItemDao, purchase.id, 'idPurchase')

        await purchaseDao.verify(purchase.id)


        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.findNId = async (req, res) => {
    try {

        res.json({
            ok: true,
            data: await purchaseDao.findAutoincrementID()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}