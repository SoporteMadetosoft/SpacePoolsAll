const CustomerContactPersons = require("../../models/customers/CustomerContactPerson");
const GenericDao = require("../GenericDao");
const DepartmentDao = require("../setup/general/DepartmentDao");

class CustomerContactPersonDao extends GenericDao {
    constructor() {
        super(CustomerContactPersons)
        this.DepartmentDao = new DepartmentDao()
    }

    findByCustomerId(id) {
        // console.log(`SELECT * FROM customers_contact WHERE idCustomer = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM customers_contact WHERE idCustomer = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const centerContactList = []
                    for (const centerDB of result) {
                        centerContactList.push(await this.mountObj(centerDB))
                    }
                    resolve(centerContactList)
                }
            })
        })
    }

    findMainContactCustomer(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM customers_contact WHERE idCustomer = ? AND `defaultContact` = 1', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    }

    async mountObj(data) {
        const docs = {
            ...data,
            department: await this.DepartmentDao.findById(data.department)
        }

        return new CustomerContactPersons(docs)
    }


}
module.exports = CustomerContactPersonDao