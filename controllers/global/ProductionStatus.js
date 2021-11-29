const ProductionStatusDao = require('../../dao/global/ProductionStatusDao')
const ProductionStatus = require('../../models/global/ProductionStatus')

const productionstatusDao = new ProductionStatusDao(ProductionStatus)
exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await productionstatusDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
