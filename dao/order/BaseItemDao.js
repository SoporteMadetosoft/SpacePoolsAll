const BaseItem = require('../../models/order/BaseItem')
const GenericDao = require("../GenericDao");
const ItemDao = require('../item/ItemDao');


class BaseItemDao extends GenericDao{
    constructor(){
        super(BaseItem)
    }

    async mountObj(data){
        const baseItem = {
            ...data
        }
        return new BaseItem(baseItem)
    }

    async mountList(data) {

    }

    findByOrderId(id){
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders_base_items WHERE idOrder = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result[0])
                }
            })
        })
    }
}
module.exports = BaseItemDao