const ItemsColorsDao = require('../../dao/item/ItemColorsDao')
const ItemDao = require('../../dao/item/ItemDao')

const itemDao = new ItemDao()
const itemsColorsDao = new ItemsColorsDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await itemDao.findAll()
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
        result = await itemDao.findByItemType(itemType, idVendor)
    } else {
        result = await itemDao.findByItemTypeAndVendor(itemType, idVendor)
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
            data: await itemDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
exports.comprobacionStock = async (req, res) => {
    const { idItem } = req.body.nObj
    console.log(idItem)

    try {
        res.json({
            ok: true,
            data: await itemDao.comprobacionStock(idItem)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await itemDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT ITEM */
        const item = req.body.form
        // const colors = req.body.form.colors

        delete item.color
        delete item.colors


        const insert = await itemDao.insert(item)

        // itemDao.multipleAccess(colors, itemsColorsDao, insert.insertId, 'idItem')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE ITEM */
        const item = req.body.form
        const colors = req.body.form.colors

        colors.length !== 0 && (item.stock = 0)

        delete item.color
        delete item.colors

        await itemDao.update(item)

        //itemDao.multipleAccess(colors, itemsColorsDao, item.id, 'idItem')

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
            data: await itemDao.findAutoincrementID()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}


exports.selectByIdItem = async (req, res) => {
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
