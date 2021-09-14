const Item = require("../../models/purchase/Item");
const GenericDao = require("../GenericDao");

const RItemDao = require("../item/ItemDao");

class ItemDao extends GenericDao {
    constructor() {
        super(Item);
        this.RItemDao = new RItemDao()
    }

    async mountObj(data) {
        const item = {
            ...data,
            idItem: await this.RItemDao.findById(data.idItem)
        }
        return new Item(item)
        
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { purchaseId, idItem, quantity } = list
        const nObj = { purchaseId: purchaseId, idItem: idItem, quantity: quantity }
        return nObj
    }

    findByPurchaseId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM purchases_items WHERE purchaseId = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const itemList = []
                    for (const centerDB of result) {
                        itemList.push(this.mountObj(centerDB))
                    }

                    resolve(itemList)
                }
            })
        })
    }

    findByItemId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM purchases_items WHERE idItem = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const itemsList = []
                    for (const centerDB of result) {
                        itemsList.push(this.mountObj(centerDB))
                    }

                    resolve(itemsList)
                }
            })
        })
    }

}

module.exports = ItemDao