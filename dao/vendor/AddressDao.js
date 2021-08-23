const Address = require("../../models/vendors/Address");
const GenericDao = require("../GenericDao");

const AddressTypeDao = require("../setup/general/AddressesTypesDao");

class AddressDao extends GenericDao {
    AddressTypeDao

    constructor() {
        super(Address);
        this.AddressTypeDao = new AddressTypeDao()
    }

    async mountObj(data) {
        const addressType = await this.AddressTypeDao.findById(data.addressType)
        const address = {
            ...data,
            addressType: await this.createSelect(addressType.base),
        }
        return new Address(address)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const{vendorId, address, satet, town} =list
        const nObj = {vendorId :vendorId, address :address, satet: satet, town : town}
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
            this.db.query('SELECT * FROM vendors_addresses WHERE vendorId = ?', [id], (err, result) => {
                if(err){ 
                    reject(err)
                }else{
                    const adressesList = []
                    for(const centerDB of result){
                        adressesList.push(this.mountObj(centerDB))
                    }
                  
                    resolve(adressesList)
                }
            })
        })
    }


}
module.exports = AddressDao