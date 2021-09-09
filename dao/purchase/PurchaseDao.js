const Purchase = require("../../models/purchase/Purchase");
const GenericDao = require("../GenericDao");

const ItemDao = require("../purchase/ItemDao");
const VendorDao = require("../vendor/VendorDao")

class PurchaseDao extends GenericDao {
    ItemDao
    constructor() {
        super(Purchase);
        this.ItemDao = new ItemDao()
        this.VendorDao = new VendorDao()
    }

    async mountObj(data) {

        const purchase = {
            ...data,
            items: await this.ItemDao.findByPurchaseId(data.id)
        }
        return new Purchase(purchase)
    }

    async mountList(data) {
        const vendor = await this.VendorDao.findVendorById(data.vendorId)
        const list = {
            ...data,
            items: await this.ItemDao.findByPurchaseId(data.id),
            vendorN: vendor != undefined ? vendor.comercialName : 'p'

        }

        const { purchaseCode, items, vendorN, purchaseDate, deliveryDate, observations } = list





        const newPurchaseDate = this.datetimeToEuropeDate(purchaseDate)
        const newDeliveryDate = this.datetimeToEuropeDate(deliveryDate)

        const nObj = { purchaseCode: purchaseCode, items: "", vendorId: vendorN, purchaseDate: newPurchaseDate, observations: observations, deliveryDate: newDeliveryDate }
        return nObj
    }



    findByVendorId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM purchases WHERE idVendor = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const addressesList = []
                    for (const centerDB of result) {
                        addressesList.push(this.mountObj(centerDB))
                    }

                    resolve(addressesList)
                }
            })
        })
    }

}

module.exports = PurchaseDao