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
            itemId: await this.RItemDao.findById(data.itemId)
        }
        return new Item(item)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { purchaseId, itemId, quantity } = list
        const nObj = { purchaseId: purchaseId, itemId: itemId, quantity: quantity }
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
            this.db.query('SELECT * FROM purchases_items WHERE itemId = ?', [id], (err, result) => {
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