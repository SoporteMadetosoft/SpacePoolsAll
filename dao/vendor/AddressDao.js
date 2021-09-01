const VendorAddress = require("../../models/vendors/VendorAddress");
const GenericDao = require("../GenericDao");

const AddressTypeDao = require("../setup/general/AddressesTypesDao");

class AddressDao extends GenericDao {
    constructor() {
        super(VendorAddress);
        this.AddressTypeDao = new AddressTypeDao()
    }

    async mountObj(data) {
        const address = {
            ...data,
            addressType: await this.AddressTypeDao.findById(data.addressType)
        }
        return new VendorAddress(address)
    }

    async mountList(data) {
        const list = {
            ...data,
        }
        const { idVendor, address, population, province } = list
        const nObj = { idVendor: idVendor, address: address, population: population, province: province }
        return nObj
    }

    findByVendorId(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM vendors_addresses WHERE idVendor = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let Addresslist = []
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