const Production = require("../../models/production/Production");
const GenericDao = require("../GenericDao");

class ProductionDao extends GenericDao {
    constructor() {
        super(Production);
    }

    async mountObj(data) {
        const production = {
            ...data,

        }
        return new Production(production)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { orderId, productionCode, status } = list
        const nObj = { orderId: orderId, productionCode: productionCode, status: status }
        return nObj
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM production WHERE orderId = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const order = []
                    for (const centerDB of result) {
                        order.push(this.mountObj(centerDB))
                    }

                    resolve(order)
                }
            })
        })
    }

}

module.exports = ProductionDao