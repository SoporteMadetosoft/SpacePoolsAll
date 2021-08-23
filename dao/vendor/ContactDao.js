const Contact = require("../../models/vendors/Contact");
const GenericDao = require("../GenericDao");

const DepartmentDao = require("../setup/general/DepartmentDao");


class ContactDao extends GenericDao {
    DepartmentDao

    constructor() {
        super(Contact);
        this.DepartmentDao = new DepartmentDao()
    }

    async mountObj(data) {
        const department = await this.DepartmentDao.findById(data.department)
        const contact = {
            ...data,
            department: await this.createSelect(department.base),
        }
        return new Contact(contact)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const{id, name, department, phone, email} =list
        const nObj = {id :id, name :name, department: department, phone : phone, email: email}
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

    findByVendorId (id) {
        return new Promise((resolve, reject) => { 
            this.db.query('SELECT * FROM vendors_contact WHERE vendorId= ?', [id], (err, result) => {
                if(err){ 
                    reject(err)
                }else{
                    const contactList = []
                    for(const centerDB of result){
                        contactList.push(this.mountObj(centerDB))
                    }
                    console.log(resolve(contactList))
                    resolve(contactList)
                }
            })
        })
    }

    findMainContactById (id) {
        return new Promise((resolve, reject) => { 
            this.db.query('SELECT * FROM vendors_contact WHERE vendorId = ? AND defaultContact = 1', [id], (err, result) => {
                if(err){ 
                    reject(err)
                }else{
                    const contactList = []
                    for(const centerDB of result){
                        contactList.push(this.mountObj(centerDB))
                    }
                  
                    resolve(contactList)
                }
            })
        })
    }


}

module.exports = ContactDao