const Contact = require("../../models/vendors/Contact");
const GenericDao = require("../GenericDao");

const DepartmentDao = require("../setup/general/DepartmentDao");


class ContactDao extends GenericDao {
    constructor() {
        super(Contact);
        this.DepartmentDao = new DepartmentDao()
    }

    async mountObj(data) {
        const contact = {
            ...data,
            department: await this.DepartmentDao.findById(data.department)
        }
        return new Contact(contact)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { id, name, department, phone, email } = list
        const nObj = { id: id, name: name, department: department, phone: phone, email: email }
        return nObj
    }

    findByVendorId(id) {
        // console.log(`SELECT * FROM vendors_contact WHERE idVendor = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM vendors_contact WHERE idVendor = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const contactList = []
                    for (const centerDB of result) {
                        contactList.push(await this.mountObj(centerDB))
                    }
                    resolve(contactList)
                }
            })
        })
    }

    findMainContactById(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM vendors_contact WHERE idVendor = ? AND defaultContact = 1', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])

                }
            })
        })
    }


}

module.exports = ContactDao