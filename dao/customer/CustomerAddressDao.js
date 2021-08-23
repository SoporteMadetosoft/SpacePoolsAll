const GenericDao = require("../GenericDao");
const AddressTypesDao = require("../setup/general/AddressesTypesDao");
const CustomerAddress = require("../../models/customers/CustomerAddress");

class CustomerAddressDao extends GenericDao{
    addressTypesDao

    constructor() {
        super(CustomerAddress)
        this.addressTypesDao = new AddressTypesDao()
    }

    findByCustomerId(id) {
        return new Promise( (resolve, reject) => {
            this.db.query('SELECT * FROM customers_addresses WHERE idCustomer = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

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


    async mountObj(data) {
        const type =await this.addressTypesDao.findById(data.addressType)
        const docs = {
            _id: '0',
            ...data,
            addressType: await this.addressTypesDao.createSelect(await type.base)
        }
        return docs
    }
}
module.exports = CustomerAddressDao