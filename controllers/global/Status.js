const StatusDao = require('../../dao/global/StatusDao')
const Status = require('../../models/global/Status')

const statusDao = new StatusDao(Status)
exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await statusDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
