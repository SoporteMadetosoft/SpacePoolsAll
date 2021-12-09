const ItemColor = require("../../models/purchase/ItemColor");
const GenericDao = require("../GenericDao");
const ItemsColorsDao = require("../item/ItemColorsDao");

class PurchaseItemColorDao extends GenericDao {
    constructor() {
        super(ItemColor);
        this.ItemsColorsDao = new ItemsColorsDao()
    }

    async mountObj(data) {
        const item = {
            ...data,
            idItem: await this.ItemsColorsDao.findById(data.idItem)
        }
        return new ItemColor(item)

    }

    async mountItem(data) {
        const { stock } = await this.ItemsColorsDao.totalColorStock(data.idItem.id, data.idColor)
        const item = {
            id: data.id,
            idItem: {
                id: data.idItem.id,
                name: data.idItem.name
            },
            idColor: await this.ItemsColorsDao.ColorsDao.findById(data.idColor),
            itemType: data.idItem.itemType,
            quantity: data.quantity,
            cost: data.idItem.cost,
            stock
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
            this.db.query('SELECT * FROM purchases_item_colors WHERE idPurchase = ?', [id], async (err, result) => {
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
            this.db.query('SELECT * FROM purchases_item_colors WHERE idItem = ?', [id], (err, result) => {
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
            this.db.query(`UPDATE purchases_item_colors SET quantity = quantity - ${recived}, recived = recived + ${recived} WHERE id = ?`, [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            })
        })
    }

}

module.exports = PurchaseItemColorDao