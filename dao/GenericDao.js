const dbCon = require("./Connection");

class GenericDao {
    model
    db = dbCon
    auxModel
    
    constructor(model) {
        this.model = model;
        this.auxModel = new model({});
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM ?? WHERE id = ?`, [this.auxModel.table, id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(await this.mountObj(result[0]))
                }
            });
        })

    }

    findAll() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ??', [this.auxModel.table], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountList(res))
                    }

                    resolve(objList)
                }
            });
        })
    }

    /**Delete from databse, returns the id on the success **/
    deleteById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`DELETE FROM ?? WHERE id = ?`, [this.auxModel.table, id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(id)
                }
            });
        })
    }

    insert(params) {
        Object.keys(params).forEach((k) => { if (params[k] === '') { params[k] = null } })
        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO ?? (??) VALUES  (?)`, [this.auxModel.table, Object.keys(params), Object.values(params)], async (err, result) => {
                if (err) {
                    reject(err)

                } else {
                    resolve(result)

                }
            });
        })
    }

    update(params) {
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE ?? Set ${this.#formatUpdate(params)} WHERE id =  ? `, [this.auxModel.table, params.id ], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
    }

    multipleAccess = async (data, obj, id, foreign) => {
        const idsDb =await obj.findAllId(id, foreign)
        const idsForm = []
        data.forEach( element => {
            if (typeof obj.unMountBase == 'function') { element =  obj.unMountBase(element) }
            const action = 'id' in element ? 'update' : 'insert'

            if (action === 'insert') { 
                element[foreign] = id 
            }else{
                idsForm.push(element.id)
            }

            obj[action](element)
        })
        const diff = idsDb.filter(x => !idsForm.includes(x))
        
        diff.forEach(id => {
            obj.deleteById(id)
        })
    }

    #formatUpdate (params){
        let update=''
        Object.entries(params).forEach(element => {
            if(element[0]!='id' && element[0]!='_id'){
                update= update.concat("`",element[0], "` = ", "'" ,element[1],"', ")
            }
        });
        return update.substring(0,update.length-2)
    }

    async createSelect(obj){
        let obj2 = {}
        obj2.value = obj.id
        obj2.label = obj.name
        return obj2
    }

    async undoSelect(obj){
        return obj.value
    }

    datetimeToDate(date) {
        if (date !== null) {
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            month = month >= 10 ? month : '0' + month
            let dt = date.getDate()
            dt = dt >= 10 ? dt : '0' + dt
            return (year + '-' + month + '-' + dt)
        }
    }

}


module.exports = GenericDao