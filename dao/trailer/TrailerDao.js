const Repair = require("../../models/trailer/Repair");
const Trailer = require("../../models/trailer/Trailer");
const GenericDao = require("../GenericDao");

const StatusDao = require("../global/StatusDao");
const RepairDao = require("../trailer/RepairDao");
const ModelDao = require("../setup/general/ModelDao");

class TrailerDao extends GenericDao{
    RepairDao
    StatusDao
    ModelDao

    constructor(){
        super(Trailer);
        this.RepairDao = new RepairDao()
        this.StatusDao = new StatusDao()
        this.ModelDao = new ModelDao()
    }

    async mountObj(data){
        const status = await this.StatusDao.findById(data.status)
        const model = await this.ModelDao.findById(data.model)
        const trailer={
            ...data,
            repairs: await this.RepairDao.findByTrailerId(data.id),
            status: await this.createSelect(status.base),
            model: await this.createSelect(model.base)
        }
        return new Trailer(trailer)
    }

    async mountList(data){
        const list = {
            ...data,
        }

        const{ id, plate, model}=list
        const nObj = {id:id, plate:plate, model:model}
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
}   
module.exports = TrailerDao