const Canvas = require('../../models/order/Canvas')
const GenericDao = require("../GenericDao");

class CanvasDao extends GenericDao{
    constructor(){
        super(Canvas)
    }

    async mountObj(data){
        const canvas = {
            ...data
        }
        return new Canvas(canvas)
    }

    findByOrderId(id){
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders_canvas WHERE idOrder = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    const customerData = []
                    for (const canvasItem of result) {

                        customerData.push(canvasItem)
                    }
                    resolve(customerData)
                }
            })
        })
    }
}
module.exports = CanvasDao