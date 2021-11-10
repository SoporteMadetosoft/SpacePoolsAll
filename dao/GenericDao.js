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
        // console.log(`SELECT * FROM ${this.auxModel.table} WHERE id = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM ?? WHERE id = ?`, [this.auxModel.table, id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(await this.mountObj(result[0]))
                }
            })
        })
    }

    findAll() {
        // console.log(`SELECT * FROM ${this.auxModel.table} ORDER BY id DESC`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ?? ORDER BY id DESC', [this.auxModel.table], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountList(res))
                    }
                    resolve(objList)
                }
            })
        })
    }

    findAllStatus() {

        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ?? WHERE idStatus = 2', [this.auxModel.table], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let objList = []
                    for (const res of result) {
                        objList.push(await this.mountList(res))
                    }
                    resolve(objList)
                }
            })
        })
    }

    findAllId(id, foreign) {
        // console.log(`SELECT id FROM ${this.auxModel.table} WHERE ${foreign} = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT id FROM ?? WHERE ?? = ?', [this.auxModel.table, foreign, id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let idList = []
                    for (const res of result) {
                        idList.push(res.id)
                    }
                    resolve(idList)
                }
            })
        })
    }

    deleteById(id) {
        // console.log(`DELETE FROM ${this.auxModel.table} WHERE id = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query(`DELETE FROM ?? WHERE id = ?`, [this.auxModel.table, id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(id)
                }
            })
        })
    }

    insert(params) {
        // console.log(`INSERT INTO ${this.auxModel.table} (${Object.keys(params)}) VALUES  (${Object.values(params)})`)
        Object.keys(params).forEach((k) => { if (params[k] === '') { params[k] = null } })
        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO ?? (??) VALUES  (?)`, [this.auxModel.table, Object.keys(params), Object.values(params)], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    update(params) {
        // console.log(`UPDATE ${this.auxModel.table} SET ${this.#formatUpdate(params)} WHERE id =  ${params.id} `)
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE ?? SET ${this.#formatUpdate(params)} WHERE id =  ? `, [this.auxModel.table, params.id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            })
        })
    }

    equalize(param1, param2, controlParam, id) {
        // console.log(`UPDATE ${this.auxModel.table} SET ${param1} = ${param2} WHERE ${controlParam} =  ${id} `)
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE ?? SET ?? = ?? WHERE ?? =  ? `, [this.auxModel.table, param1, param2, controlParam, id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('')
                }
            })
        })
    }

    multipleAccess = async (data, obj, id, foreign) => {
        const idsDb = await obj.findAllId(id, foreign)
        const idsForm = []
        const d = data
        d.forEach(element => {
            const action = element.id ? 'update' : 'insert'

            if (action === 'insert') {
                element[foreign] = id
            } else {
                idsForm.push(element.id)
            }

            obj[action](element)
        })

        const diff = idsDb.filter(x => !idsForm.includes(x))
        diff.forEach(id => {
            obj.deleteById(id)
        })
    }

    #formatUpdate(params) {
        let update = ''
        Object.entries(params).forEach(element => {
            if (element[0] != 'id' && element[1] != 'null' && element[1] != null && element[1] != undefined) {
                update = update.concat("`", element[0], "` = ", "'", element[1], "', ")
            }
        })
        return update.substring(0, update.length - 2)
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

    datetimeToEuropeDate(date) {
        if (date !== null) {
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            month = month >= 10 ? month : '0' + month
            let dt = date.getDate()
            dt = dt >= 10 ? dt : '0' + dt
            return (dt + '/' + month + '/' + year)
        }
    }

    findAutoincrementID() {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`, [process.env.DB_NAME, this.auxModel.table], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    
}




module.exports = GenericDao