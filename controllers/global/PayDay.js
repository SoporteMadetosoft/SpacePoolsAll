const PayDayDao = require('../../dao/global/PayDayDao')
const PayDay = require('../../models/global/PayDay')

const paydayDao = new PayDayDao(PayDay)
exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await paydayDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
