const ItemColorStockDao = require('../../dao/item/ItemColorStockDao')

const itemsColorStockDao = new ItemColorStockDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await itemsColorStockDao.findAll()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}


exports.select = async (req, res) => {
    const treeData = await itemsColorStockDao.findAllFamily(req.body.idNode)
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
            data: await itemsColorStockDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await itemsColorStockDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT PRODUCT FAMILY */
        const insert = await itemsColorStockDao.insert(req.body.form)


        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE PRODUCT FAMILY */
        const colors = req.body.form
        if (colors.id === colors.sotck) {
            return res.status(500).send()
        }
        if (colors.sotck === null) {
            await itemsColorStockDao.setParentNullById(colors.id)
            delete colors.sotck
        }
        itemsColorStockDao.update(colors)


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
            data: await itemsColorStockDao.findAutoincrementID()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}