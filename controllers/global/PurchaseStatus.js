const PurchaseStatusDao = require('../../dao/global/PurchaseStatusDao')
const PurchaseStatus = require('../../models/global/PurchaseStatus')

const purchaseStatusDao = new PurchaseStatusDao(PurchaseStatus)
exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await purchaseStatusDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
