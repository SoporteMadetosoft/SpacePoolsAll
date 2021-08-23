const Setup = require("../../models/setup/Setup");
const GenericDao = require("../GenericDao");

class SetupDao extends GenericDao{

    id
    nombre
    object
    objectAux
    constructor(object){
        super(object)
        this.object = object
        this.objectAux = new this.object({})
    }

    async mountObj(data){

        const setup ={
            ...data
        }

        return new this.object(setup)
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


    async mountList(data){
        return {...data}
        
    }

    async mountSelect(data){
        return await this.createSelect(data)
        
    }

}
module.exports = SetupDao