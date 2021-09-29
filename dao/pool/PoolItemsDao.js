const PoolItems = require("../../models/pool/PoolItems");
const GenericDao = require("../GenericDao");
const ItemDao = require("../item/ItemDao");

class PoolItemsDao extends ItemDao {
    constructor() {
        super(PoolItems);
        this.ItemDao = new ItemDao()
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
                        if(item[0]){
                           if(item[0]['itemType'].id === itemType){
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

    async getItemsByIdPool(idPool){
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

        const poolItems = {
            id: data.id,
            idItem: {
                name: name,
                id: data.idItem
            },
            quantity: data.cantidad,
            coste: cost
        }
        console.log(poolItems)
        return poolItems
    }
}

module.exports = PoolItemsDao