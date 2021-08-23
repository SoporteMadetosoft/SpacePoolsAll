const Vendor = require("../../models/vendors/Vendor");
const GenericDao = require("../GenericDao");

const ContactDao = require("../vendor/ContactDao");
const AddressDao = require("../vendor/AddressDao");
const VendorType = require("../setup/vendors/TypeDao");
const PaymentMethodDao = require("../setup/PaymentMethodDao");
const StatusDao = require("../global/StatusDao");
const PurchaseDao = require("../purchase/PurchaseDao");

class VendorDao extends GenericDao {
    ContactDao
    AddressDao
    VendorType
    PaymentMethodDao
    StatusDao
    PurchaseDao

    constructor() {
        super(Vendor);
        this.ContactDao = new ContactDao()
        this.AddressDao = new AddressDao()
        this.VendorType = new VendorType()
        this.PaymentMethodDao = new PaymentMethodDao()
        this.StatusDao = new StatusDao()
        this.PurchaseDao = new PurchaseDao()
    }

    async mountObj(data) {
        const vendorType = await this.VendorType.findById(data.idVendorType)
        const paymentMethod = await this.PaymentMethodDao.findById(data.idPaymentMethod)
        const status = await this.StatusDao.findById(data.idStatus)

        const vendor = {
            ...data,
            contacts: await this.ContactDao.findByVendorId(data.id),
            addresses: await this.AddressDao.findByVendorId(data.id),
            idVendorType: await this.createSelect(vendorType.base),
            idPaymentMethod: await this.createSelect(paymentMethod.base),
            idStatus: await this.createSelect(status.base)
            
        }
        return new Vendor(vendor)
    }

    async createSelect(obj){
        let obj2 = {}
        obj2.value = obj.id
        obj2.label = obj.name
        return obj2
    }

    async mountList(data) {
        const contact = await this.ContactDao.findMainContactById(data.id)
        const list = {
            ...data,
            ContactName: contact != undefined ? contact.name : '',
            ContactPhone: contact != undefined ? contact.phone : '',
        }
        const {id, vendorCode, comercialName, CIF, phone, email, ContactName, ContactPhone} = list
        const nObj = {id: id, vendorCode :vendorCode, comercialName :comercialName, CIF: CIF, phone : phone, email: email , contactName:ContactName, contactPhone:ContactPhone}
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

}

module.exports = VendorDao