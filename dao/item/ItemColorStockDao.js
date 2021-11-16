const ItemColorsStock = require("../../models/item/ItemColorStock")
const GenericDao = require("../GenericDao");

const ColorsDao = require("../setup/item/ColorsDao");


class ItemColorStockDao extends GenericDao {
    constructor() {
        super(ItemColorsStock);
        this.ColorDao = new ColorsDao()
    }

    async mountObj(data) {
        const objColor = await this.ColorDao.findById(data.idColor)
        const colorStock = {
            stock: data.stock,
            idColor: objColor
        }

        return colorStock

    }

    async mountList(data) {
        return data
    }

    findByItemId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM item_colors WHERE idItem = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let colorList = []
                    for (const color of result) {
                        colorList.push(await this.mountObj(color))
                    }
                    resolve(colorList)
                }
            })
        })
    }
}

module.exports = ItemColorStockDao