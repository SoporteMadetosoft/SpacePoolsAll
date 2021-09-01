const ItemTypeDao = require('../../dao/global/ItemTypeDao')

const itemTypeDao = new ItemTypeDao()

exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await itemTypeDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}