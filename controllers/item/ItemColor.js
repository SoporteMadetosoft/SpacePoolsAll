const ItemsColorsDao = require('../../dao/item/ItemColorsDao')
const ItemDao = require('../../dao/item/ItemDao')
const itemsColorsDao = new ItemsColorsDao()
const itemDao = new ItemDao()

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
    const id = parseInt(req.params.id, 10)

    try {
        res.json({
            ok: true,
            data: await itemsColorsDao.findByItemId(id)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.listItems = async (req, res) => {
    const { itemType, idVendor } = req.body.nObj
    let result
    if (idVendor === null) {
        result = await itemsColorsDao.findByItemType(itemType, idVendor)
    } else {
        result = await itemsColorsDao.findByItemTypeAndVendor(itemType, idVendor)
    }
    try {
        res.json({
            ok: true,
            data: result
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
        const item = req.body.form
        const colors = req.body.form.colors

        delete item.color
        delete item.colors

        const insert = await itemDao.insert()

        itemsColorsDao.multipleAccess(colors, itemsColorsDao, insert.insertId, 'idItem')
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE COLOR STOCK  */
        const item = req.body.form
        const colors = req.body.form.colors

        colors.length !== 0 && (item.stock = 0)

        delete item.color
        delete item.colors

        await itemsColorsDao.update(item)

        itemsColorsDao.multipleAccess(colors, itemsColorsDao, item.id, 'idItem')
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