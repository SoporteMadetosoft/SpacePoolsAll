const Tax = require("../../../models/setup/general/Tax");
const SetupDao = require("../SetupDao");

class TaxDao extends SetupDao {
    constructor() {
        super(Tax)

    }

    mountObj(data) {
        const docs = {
            ...data
        }
        return new Tax(docs)
    }

    findTaxNameBy(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT name FROM setup_taxes WHERE Id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0].name)
                    //  resolve(result[0])
                }
            })
        })
    }

}
module.exports = TaxDao