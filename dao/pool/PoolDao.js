const Pool = require("../../models/pool/Pool");
const GenericDao = require("../GenericDao");

const StatusDao = require("../global/StatusDao");

class PoolDao extends GenericDao {
    StatusDao

    constructor() {
        super(Pool);
        this.StatusDao = new StatusDao()
    }

    async mountObj(data) {
        const status = await this.StatusDao.findById(data.status)
        const pool = {
            ...data,
            status: await this.createSelect(status.base)
        }
        return new Pool(pool)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const{id, nameEuropa, cost, status} =list
        const nObj = {id :id, nameEuropa :nameEuropa, cost: cost, status : status}
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
                        objList.push(await this.mountSelect(res))
                    }

                    resolve(objList)
                }
            });
        })
    }
    
    async mountSelect(data){
        return await this.createSelect(data)
        
    }

    async createSelect(obj){
        let obj2 = {}
        obj2.value = obj.id
        obj2.label = obj.nameEuropa
        return obj2
    }

}

module.exports = PoolDao