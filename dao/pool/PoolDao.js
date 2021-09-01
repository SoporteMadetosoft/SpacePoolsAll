const Pool = require("../../models/pool/Pool");
const GenericDao = require("../GenericDao");

const StatusDao = require("../global/StatusDao");

class PoolDao extends GenericDao {
    constructor() {
        super(Pool);
        this.StatusDao = new StatusDao()
    }

    async mountObj(data) {
        const pool = {
            ...data,
            idStatus: await this.StatusDao.findById(data.idStatus)
        }
        return new Pool(pool)
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

}

module.exports = PoolDao