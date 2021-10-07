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
        const items = req.body.form.items
        const raws = req.body.form.raws

        const allItems = [...items, ...raws]

        delete pool.items
        delete pool.raws

        console.log(pool)

        const insert = await poolDao.insert(pool)
        poolDao.multipleAccess(allItems, poolDao.PoolItemsDao, insert.insertId, 'idPool')

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
        const { items, raws } = req.body.form

        const allItems = [...items, ...raws]

        delete pool.items
        delete pool.raws
        delete pool.allItems

        await poolDao.update(pool)
        poolDao.multipleAccess(allItems, poolDao.PoolItemsDao, pool.id, 'idPool')

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