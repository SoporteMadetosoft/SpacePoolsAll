const CustomerData = require("../../models/order/CustomerData");
const GenericDao = require("../GenericDao");

class CustomerDataDao extends GenericDao {

    constructor() {
        super(CustomerData);
    }

    async mountObj(data) {

        const customerData = {
            ...data,

        }
        return new CustomerData(customerData)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { id, phone, email } = list
        const nObj = { id: id, phone: phone, email: email }
        return nObj
    }

    findByOrderId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM orders_customer_data WHERE idOrder = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const customerData = []
                    for (const centerDB of result) {
                        customerData.push(await this.mountObj(centerDB))
                    }

                    resolve(customerData)
                }
            })
        })
    }

    findOneFieldById(field, id) {
        // console.log(`SELECT ${field} FROM orders_customer_data WHERE idOrder = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT ?? FROM orders_customer_data WHERE idOrder = ?', [field, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0][field])
                }
            })
        })
    }
}

module.exports = CustomerDataDao