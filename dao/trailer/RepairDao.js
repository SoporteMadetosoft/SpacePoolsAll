const Repair = require("../../models/trailer/Repair");
const GenericDao = require("../GenericDao");

class RepairDao extends GenericDao{

    constructor(){
        super(Repair);

    }

    findByTrailerId(id) {
        return new Promise( (resolve, reject) => {
            this.db.query('SELECT * FROM trailer_repair WHERE trailerId = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    let RepairList =[]
                    for (const data of result) {
                        const obj = await this.mountObj(data)

                        RepairList.push(obj)
                    }
                    resolve(RepairList)
                }
            })
        })
    }

    async mountObj(data){
        const repair={
            ...data
        }
        return new Repair(repair)
    }

    async mountList(data){
        const list = {
            ...data,
        }

        const{ date, description, garage}=list
        const nObj = {date:date, description:description, garage:garage}
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
module.exports = RepairDao