const Item = require("../../models/purchase/Item");
const GenericDao = require("../GenericDao");

const ItemDao = require("../item/ItemDao");

class PurchaseItemDao extends GenericDao {
    constructor() {
        super(Item);
        this.ItemDao = new ItemDao()
    }

    async mountObj(data) {
        const item = {
            ...data,
            idItem: await this.ItemDao.findById(data.idItem)
        }
        return new Item(item)

    }

    async mountItem(data){
        const item = {
            idItem: {
                id: data.idItem.id,
                name: data.idItem.name
            },
            itemType: data.idItem.itemType,
            quantity: data.quantity,
            cost: data.idItem.cost,
            stock: data.idItem.stock
        }
        return item
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
            this.db.query('SELECT * FROM purchases_items WHERE idPurchase = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const itemList = []
                    for (const item of result) {
                        itemList.push(await this.mountItem(await this.mountObj(item)))
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
                    for (const item of result) {
                        itemsList.push(this.mountObj(item))
                    }

                    resolve(itemsList)
                }
            })
        })
    }

}

module.exports = PurchaseItemDao