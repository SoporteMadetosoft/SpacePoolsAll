const LogosDao = require('../../dao/global/LogosDao')

const logosDao = new LogosDao()

exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await logosDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}