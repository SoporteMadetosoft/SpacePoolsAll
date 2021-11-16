const Colors = require("../../../models/setup/Item/Colors");
const SetupDao = require("../SetupDao");

class ColorsDao extends SetupDao {

    constructor() {
        super(Colors)
    }

    findColorById(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM setup_colors WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    }

    findColorNameBy(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT name FROM setup_colors WHERE id = ?', [id], (err, result) => {
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
module.exports = ColorsDao