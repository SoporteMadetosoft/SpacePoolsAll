const ItemDao = require('../../dao/item/ItemDao')
const ProductFamilyDao = require('../../dao/item/ProductFamilyDao')
const ProductPlaceDao = require('../../dao/setup/item/PlaceDao')

const itemDao = new ItemDao()
const productFamilyDao = new ProductFamilyDao()
const productPlaceDao = new ProductPlaceDao()



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
    const itemType = req.headers.itemtype
    try {
        res.json({
            ok: true,
            data: await itemDao.findByItemType(itemType)
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
        await itemDao.insert(item)

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
        await itemDao.update(item)

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}