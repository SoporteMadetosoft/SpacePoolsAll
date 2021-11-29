const ModeDao = require('../../dao/global/ModeDao')
const Mode = require('../../models/global/Mode')

const modeDao = new ModeDao(Mode)
exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await modeDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
