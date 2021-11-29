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

        return item

    }

    async mountItem(data) {
        const item = {
            id: data.id,
            idItem: {
                id: data.idItem.id,
                name: data.idItem.name
            },
            itemType: data.idItem.itemType,
            quantity: data.quantity,
            recived: data.recived,
            cost: data.idItem.cost,
            stock: data.idItem.stock
        }
        return item
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

    sumRecived(id, recived) {
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE purchases_items SET quantity = quantity - ${recived}, recived = recived + ${recived} WHERE id = ?`, [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            })
        })
    }

}

module.exports = PurchaseItemDao