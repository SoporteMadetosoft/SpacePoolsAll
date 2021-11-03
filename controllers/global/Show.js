const ShowDao = require('../../dao/global/ShowDao')

const showDao = new ShowDao()

exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await showDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}