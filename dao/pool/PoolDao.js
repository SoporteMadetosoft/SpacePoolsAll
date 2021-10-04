const Pool = require("../../models/pool/Pool");
const GenericDao = require("../GenericDao");

const PoolItemsDao = require("./PoolItemsDao");
//const PoolRawsDao = require("./PoolItemsDao")
const StatusDao = require("../global/StatusDao");

class PoolDao extends GenericDao {
    constructor() {
        super(Pool);
        this.StatusDao = new StatusDao()
        this.PoolItemsDao = new PoolItemsDao()
    }

    async mountObj(data) {
        const pool = {
            ...data,
            idStatus: await this.StatusDao.findById(data.idStatus),
            items: await this.PoolItemsDao.getItemsByTypeAndPool(data.id, 2),
            raws: await this.PoolItemsDao.getItemsByTypeAndPool(data.id, 1),
            allItems :  await this.PoolItemsDao.getItemsByIdPool(data.id)
        }
        return pool
    }

    async mountList(data) {
        const status = await this.StatusDao.findById(data.idStatus)
        const list = {
            ...data,    
            idStatus: status != undefined ? status.name : ''
        }
        const { id, poolCode, fabricationName, cost, idStatus } = list
        const nObj = { id: id, poolCode: poolCode, fabricationName: fabricationName, cost: cost, idStatus: idStatus }
        return nObj
    }

    findPoolById(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM pool WHERE Id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    }

    findPoolNameBy(id){
        return new Promise((resolve, reject) => {
            this.db.query('SELECT fabricationName FROM pool WHERE Id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                            resolve(result[0].fabricationName)
                  //  resolve(result[0])
                }
            })
        })
    }

}

module.exports = PoolDao