const PoolItems = require("../../models/pool/PoolItems");
const GenericDao = require("../GenericDao");
const ItemsColorsDao = require("../item/ItemColorsDao");
const ItemDao = require("../item/ItemDao");

class PoolItemsDao extends GenericDao {
    constructor() {
        super(PoolItems);
        this.ItemDao = new ItemDao()
        this.ItemsColorsDao = new ItemsColorsDao()
    }

    async getItemsByTypeAndPool(idPool, itemType) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM pool_items WHERE idPool = ?`, [idPool], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    let ItemList = []
                    for (const data of result) {
                        const item = await this.ItemDao.findByItemTypeAndId(data.idItem, itemType)
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
            this.db.query(`SELECT * FROM pool_items WHERE idPool = ?`, [idPool], async (err, result) => {
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

    async mountObj(data) {
        const { name, cost } = await this.ItemDao.findById(data.idItem)
        const colData = await this.ItemsColorsDao.findByItemId(data.idItem)
        const colores = colData.map(el => ({
            label: el.name,
            value: el.id
        }))

        const selectedColor = await this.ItemsColorsDao.ColorsDao.findById(data.idColor)

        const poolItems = {
            id: data.id,
            idItem: {
                name: name,
                id: data.idItem
            },
            idColor: selectedColor.id !== undefined ? selectedColor : '',
            colores: colores,
            quantity: data.quantity,
            coste: cost
        }
        return poolItems
    }
}

module.exports = PoolItemsDao