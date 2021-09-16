const Purchase = require("../../models/purchase/Purchase");
const GenericDao = require("../GenericDao");

const PurchaseItemDao = require("./PurchaseItemDao");
const VendorDao = require("../vendor/VendorDao")

class PurchaseDao extends GenericDao {

    constructor() {
        super(Purchase);
        this.PurchaseItemDao = new PurchaseItemDao()
        this.VendorDao = new VendorDao()
    }

    async mountObj(data) {
        const items = await this.PurchaseItemDao.findByPurchaseId(data.id)
        console.log(items)
        const purchase = {
            ...data,
            idVendor: await this.VendorDao.findVendorById(data.idVendor),
            purchaseDate: this.datetimeToDate(data.purchaseDate),
            deliveryDate: this.datetimeToDate(data.deliveryDate)
        }

        return new Purchase(purchase)
    }

    async mountList(data) {
        const vendor = await this.VendorDao.findVendorById(data.idVendor)
        const list = {
            ...data,
            idVendor: vendor != undefined ? vendor.comercialName : ''
        }

        const { id, purchaseCode, idVendor, purchaseDate, deliveryDate, observations } = list

        const newPurchaseDate = this.datetimeToEuropeDate(purchaseDate)
        const newDeliveryDate = this.datetimeToEuropeDate(deliveryDate)

        const nObj = { id: id, idVendor: idVendor, purchaseCode: purchaseCode, purchaseDate: newPurchaseDate, observations: observations, deliveryDate: newDeliveryDate }
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