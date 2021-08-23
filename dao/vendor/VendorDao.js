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
        const vendorType = await this.VendorType.findById(data.vendorType)
        const paymentMethod = await this.PaymentMethodDao.findById(data.paymentMethod)
        const status = await this.StatusDao.findById(data.status)

        const vendor = {
            ...data,
            contact: await this.ContactDao.findByVendorId(data.id),
            address: await this.AddressDao.findByVendorId(data.id),
            purchase: await this.PurchaseDao.findByVendorId(data.id),
            vendorType: await this.createSelect(vendorType.base),
            paymentMethod: await this.createSelect(paymentMethod.base),
            status: await this.createSelect(status.base)
            
        }
        console.log(vendor)
        return new Vendor(vendor)
    }

    async mountList(data) {
        const contact = await this.ContactDao.findMainContactById(data.id)
        const list = {
            ...data,
            contactName: contact != undefined ? contact.name : '',
            contactPhone: contact != undefined ? contact.phone : '',
        }
        const{vendorCode, comercialName, CIF, phone, email, contactName, contactPhone} =list
        const nObj = {vendorCode :vendorCode, comercialName :comercialName, CIF: CIF, phone : phone, email: email , contactName:contactName, contactPhone:contactPhone}
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