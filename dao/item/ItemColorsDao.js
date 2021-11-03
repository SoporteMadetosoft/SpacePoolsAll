const ItemColors = require("../../models/item/ItemColors");
const ColorsDao = require("../setup/item/ColorsDao");
const GenericDao = require("../GenericDao");

class ItemsColorsDao extends GenericDao {
    constructor() {
        super(ItemColors)
        this.ColorsDao = new ColorsDao()
    }

    async mountObj(data) {
        return new ItemColors(data)
    }

    async mountColor(data) {
        const { name } = await this.ColorsDao.findById(data.idColor)
        const color = {
            id: data.idColor,
            name
        }
        return color
    }

    findByItemId(id) {
        // console.log(`SELECT idColor FROM item_colors WHERE idItem = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM item_colors WHERE idItem = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let colorList = []
                    for (const color of result) {
                        colorList.push({
                            idColor: await this.mountColor(color),
                            stock: color.stock
                        })
                    }
                    resolve(colorList)
                }
            })
        })
    }


}
module.exports = ItemsColorsDao