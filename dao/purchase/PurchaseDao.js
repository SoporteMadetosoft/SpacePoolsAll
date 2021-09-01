const Purchase = require("../../models/purchase/Purchase");
const GenericDao = require("../GenericDao");

const ItemDao = require("../purchase/ItemDao");

class PurchaseDao extends GenericDao {
    ItemDao
    constructor() {
        super(Purchase);
        this.ItemDao = new ItemDao()
    }

    async mountObj(data) {

        const purchase = {
            ...data,
            items: await this.ItemDao.findByPurchaseId(data.id)
        }
        return new Purchase(purchase)
    }

    async mountList(data) {
        console.log(data)
        const list = {
            ...data,
        }
        const {  vendorId, purchaseDate, deliveryDate , observations } = list
        const nObj = { vendorId: vendorId, purchaseDate: purchaseDate.getDay()+"-"+purchaseDate.getMonth()+"-"+purchaseDate.getFullYear() , observations: observations, deliveryDate:deliveryDate.getDay()+"-"+deliveryDate.getMonth()+"-"+deliveryDate.getFullYear() }
        console.log(nObj);
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