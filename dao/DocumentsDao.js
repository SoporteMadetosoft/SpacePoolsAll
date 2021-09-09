const dbCon = require("./Connection");
const GenericDao = require("./GenericDao");

class DocumentsDao extends GenericDao {
    constructor(model) {
        super(model)
        this.model = model;
        this.auxModel = new model({});
    }

    findByFilePath(filePath) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM ?? WHERE url = ?`, [this.auxModel.table, filePath], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    if (result[0] !== undefined) {
                        resolve(await this.mountObj(result[0]))
                    } else {
                        resolve([])
                    }
                }
            })
        })
    }

}


module.exports = DocumentsDao