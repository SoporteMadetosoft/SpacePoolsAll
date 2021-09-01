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
        const insert = await itemDao.insert(req.body.form)
        /** INSERT PRODUCT FAMILY */
        req.body.family.forEach(element => {
            element.idVendor = insert.insertId
            productFamilyDao.insert(element)
        });
        /** INSERT PRODUCT FAMILY (subfamily)*/
        req.body.subfamily.forEach(element => {
            element.idVendor = insert.insertId
            productFamilyDao.insert(element)
        });
        /** INSERT PRODUCT PLACE */
        req.body.place.forEach(element => {
            element.idVendor = insert.insertId
            productPlaceDao.insert(element)
        });


        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        /** UPDATE ITEM */
        itemDao.update(req.body.form)
        /** INSERT PRODUCT FAMILY */
        req.body.formData.family.forEach(element => {
            productFamilyDao.update(element)
        })
        /** INSERT PRODUCT FAMILY (subfamily)*/
        req.body.formData.subfamily.forEach(element => {
            productFamilyDao.update(element)
        })
        /** INSERT PRODUCT PLACE */
        req.body.formData.place.forEach(element => {
            productPlaceDao.update(element)
        })

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}