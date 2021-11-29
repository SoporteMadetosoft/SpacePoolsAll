const PoolExtraItemsColors = require("../../models/pool/PoolExtraItemsColors");
const GenericDao = require("../GenericDao");
const ItemsColorsDao = require("../item/ItemColorsDao");


class ExtraItemColorDao extends GenericDao {
    constructor() {
        super(PoolExtraItemsColors);
        this.ItemsColorsDao = new ItemsColorsDao()
    }

    async mountObj(data) {
        const { name, cost } = await this.ItemsColorsDao.findById(data.idItem)
        const selectedColor = await this.ItemsColorsDao.findById(data.idColor)

        const colData = await this.ItemsColorsDao.findByItemId(data.idItem)

        const colores = colData.map(el => ({
            label: el.idColor.name,
            value: el.idColor.id
        }))

        const poolItems = {
            id: data.id,
            idItem: {
                name: name,
                id: data.idItem
            },
            idColor: selectedColor.id !== undefined ? selectedColor : '',
            quantity: data.quantity,
            coste: cost,
            colores: colores
        }
        return poolItems
    }

    async mountList(data) {
        const list = {
            ...data

        }
        const { idItem, coste, idColor, colores } = list
        const nObj = { idItem: idItem, coste: coste, idColor: idColor, colores: colores }
        return nObj
    }

    async getItemsByTypeAndPool(idPool, itemType) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM pool_itemColors WHERE idPool = ?`, [idPool], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    let ItemList = []
                    for (const data of result) {
                        const item = await this.ItemsColorsDao.findByItemTypeAndId(data.idItem, itemType)
                        if (item[0]) {
                            if (item[0]['itemType'].id === itemType) {
                                ItemList.push(await this.mountObj(data))
                            }
                        }
                        //ItemList.push(await this.mountObj(data))
                    }
                    resolve(ItemList)
                }
            });
        })
    }

    async getItemsByIdPool(idPool) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM pool_itemColors WHERE idPool = ?`, [idPool], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let ItemList = []
                    for (const data of result) {
                        ItemList.push(await this.mountObj(data))
                    }
                    resolve(ItemList)
                }
            });
        })
    }
}

module.exports = ExtraItemColorDao