const Vendor = require("../../models/vendors/Vendor");
const GenericDao = require("../GenericDao");

const ContactDao = require("../vendor/ContactDao");
const AddressDao = require("../vendor/AddressDao");
const VendorType = require("../setup/vendors/TypeDao");
const PaymentMethodDao = require("../setup/general/PaymentMethodDao");
const StatusDao = require("../global/StatusDao");
//const PurchaseDao = require("../purchase/PurchaseDao");

class VendorDao extends GenericDao {
    constructor() {
        super(Vendor);
        this.ContactDao = new ContactDao()
        this.AddressDao = new AddressDao()
        this.VendorType = new VendorType()
        this.PaymentMethodDao = new PaymentMethodDao()
        this.StatusDao = new StatusDao()
       // this.PurchaseDao = new PurchaseDao()
    }

    async mountObj(data) {
        const vendor = {
            ...data,
            contacts: await this.ContactDao.findByVendorId(data.id),
            addresses: await this.AddressDao.findByVendorId(data.id),
            idVendorType: await this.VendorType.findById(data.idVendorType),
            idPaymentMethod: await this.PaymentMethodDao.findById(data.idPaymentMethod),
            idStatus: await this.StatusDao.findById(data.idStatus)

        }
        return new Vendor(vendor)
    }

    async mountList(data) {
        const contact = await this.ContactDao.findMainContactById(data.id)
        const list = {
            ...data,
            ContactName: contact != undefined ? contact.name : '',
            ContactPhone: contact != undefined ? contact.phone : '',
        }
        const { id, vendorCode, comercialName, CIF, phone, email, ContactName, ContactPhone } = list
        const nObj = { id: id, vendorCode: vendorCode, comercialName: comercialName, CIF: CIF, phone: phone, email: email, contactName: ContactName, contactPhone: ContactPhone }
        return nObj
    }

    findVendorById(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM vendors WHERE Id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result[0])
                }
            })
        })
    }


}

module.exports = VendorDao