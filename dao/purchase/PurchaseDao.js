const Purchase = require("../../models/purchase/Purchase");
const GenericDao = require("../GenericDao");

const PurchaseItemDao = require("./PurchaseItemDao");
const VendorDao = require("../vendor/VendorDao");
const PurchaseStatusDao = require("../global/PurchaseStatusDao");

class PurchaseDao extends GenericDao {

    constructor() {
        super(Purchase);
        this.PurchaseItemDao = new PurchaseItemDao()
        this.VendorDao = new VendorDao()
        this.StatusDao = new PurchaseStatusDao()
    }

    async mountObj(data) {
        const purchase = {
            ...data,
            idStatus: await this.StatusDao.findById(data.idStatus),
            items: await this.PurchaseItemDao.findByPurchaseId(data.id),
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

        const { id, idStatus, purchaseCode, idVendor, purchaseDate, deliveryDate, observations } = list

        const newPurchaseDate = this.datetimeToEuropeDate(purchaseDate)
        const newDeliveryDate = this.datetimeToEuropeDate(deliveryDate)

        const nObj = { id: id, idStatus: idStatus, idVendor: idVendor, purchaseCode: purchaseCode, purchaseDate: newPurchaseDate, observations: observations, deliveryDate: newDeliveryDate }
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

    verify(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT SUM(quantity) as PENDING FROM `purchases_items` WHERE idPurchase = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objStatus = { id: id }
                    if (result[0].PENDING === 0 || result[0].PENDING === '0') {
                        objStatus.idStatus = 3
                        this.PurchaseItemDao.equalize('quantity', 'recived', 'idPurchase', id)
                    } else {
                        objStatus.idStatus = 2
                    }

                    resolve(this.update(objStatus))
                }
            })
        })
    }
}

module.exports = PurchaseDao