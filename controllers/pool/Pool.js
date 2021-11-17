const PoolDao = require('../../dao/pool/PoolDao')

const poolDao = new PoolDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await poolDao.findAll()
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
            data: await poolDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await poolDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT POOL */
        const pool = req.body.form
        const { items, raws, itemColor, rawColor } = req.body.form

        const allItems = [...items, ...raws]
        const allItems2 = [...itemColor, ...rawColor]

        delete pool.items
        delete pool.itemColor
        delete pool.raws
        delete pool.rawColor

        const insert = await poolDao.insert(pool)

        poolDao.multipleAccess(allItems, poolDao.PoolItemsDao, insert.insertId, 'idPool')
        poolDao.multipleAccess(allItems2, poolDao.ExtraItemColorDao, insert.insertId, 'idPool')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE POOL */
        const pool = req.body.form
        const { items, raws, itemColor, rawColor } = req.body.form

        const allItems = [...items, ...raws]
        const allItems2 = [...itemColor, ...rawColor]

        delete pool.items
        delete pool.itemColor
        delete pool.raws
        delete pool.rawColor

        await poolDao.update(pool)

        poolDao.multipleAccess(allItems, poolDao.PoolItemsDao, pool.id, 'idPool')
        poolDao.multipleAccess(allItems2, poolDao.ExtraItemColorDao, pool.id, 'idPool')

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
            data: await poolDao.findAutoincrementID()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}