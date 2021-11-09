const ItemsColorsDao = require('../../dao/item/ItemColorsDao')

const itemsColorsDao = new ItemsColorsDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await itemsColorsDao.findAll()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}


exports.select = async (req, res) => {
    const treeData = await itemsColorsDao.findAllColors(req.body.idNode)
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
            data: await itemsColorsDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await itemsColorsDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT COLOR AND STOCK */
        const insert = await itemsColorsDao.insert(req.body.form)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE COLOR STOCK  */
        const color = req.body.form
        if (color.id === color.stock) {
            return res.status(500).send()
        }
        if (color.stock === null) {
            await itemsColorsDao.setParentNullById(color.id)
            delete color.stock
        }
        itemsColorsDao.update(color)


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
            data: await itemsColorsDao.findAutoincrementID()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}