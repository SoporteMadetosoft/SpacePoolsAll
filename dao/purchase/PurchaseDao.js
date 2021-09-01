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
        const list = {
            ...data,
        }
        const { idVendor, purchaseDate, observations } = list
        const nObj = { idVendor: idVendor, purchaseDate: purchaseDate, observations: observations }
        return nObj
    }

    getSelect() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ??', [this.objectAux.table], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(res)
                    }

                    resolve(objList)
                }
            });
        })
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