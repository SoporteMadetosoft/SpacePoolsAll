const VendorAddress = require("../../models/vendors/VendorAddress");
const GenericDao = require("../GenericDao");

const AddressTypeDao = require("../setup/general/AddressesTypesDao");

class AddressDao extends GenericDao {
    AddressTypeDao

    constructor() {
        super(VendorAddress);
        this.AddressTypeDao = new AddressTypeDao()
    }

    async mountObj(data) {
        const addressType = await this.AddressTypeDao.findById(data.addressType)
        const address = {
            ...data,
            addressType: await this.createSelect(addressType.base),
        }
        return new VendorAddress(address)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const{idVendor, address, population, province} =list
        const nObj = {idVendor :idVendor, address :address, population: population, province : province}
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
            this.db.query('SELECT * FROM vendors_addresses WHERE idVendor = ?', [id], async (err, result) => {
                if(err){ 
                    reject(err)
                }else{
                    let Addresslist =[]
                    for (const data of result) {
                        const obj = await this.mountObj(data)

                        Addresslist.push(obj)

                    }
                    resolve(Addresslist)
                }
            })
        })
    }


}
module.exports = AddressDao