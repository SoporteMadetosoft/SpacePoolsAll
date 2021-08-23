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
        const{id, phone, email} =list
        const nObj = { id:id, phone : phone, email: email}
        return nObj
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
    
    async mountSelect(data){
        return await this.createSelect(data)
        
    }

    findByOrderId (id) {
        return new Promise((resolve, reject) => { 
            this.db.query('SELECT * FROM orders_customer_data WHERE orderId = ?', [id], (err, result) => {
                if(err){ 
                    reject(err)
                }else{
                    const customerData = []
                    for(const centerDB of result){
                        customerData.push(this.mountObj(centerDB))
                    }
                  
                    resolve(customerData)
                }
            })
        })
    }

}

module.exports = CustomerDataDao