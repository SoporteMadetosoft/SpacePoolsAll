const Customer = require("../../models/customers/Customer");

const GenericDao = require("../GenericDao");

const PaymentMethodDao = require("../setup/PaymentMethodDao");
const CustomerTypeDao = require("../setup/customer/CustomerTypeDao");
const CustomerCategoryDao = require("../setup/customer/CustomerCategoryDao");
const CustomerActivityDao = require("../setup/customer/CustomerActivityDao");
const CustomerOriginDao = require("../setup/customer/CustomerOriginDao");

const ModeDao = require("../global/ModeDao");
const StatusDao = require("../global/StatusDao");
const PayDayDao = require("../global/PayDayDao");
const Language = require("../global/LanguageDao");

const CustomerAddressDao = require("../customer/CustomerAddressDao");
const CustomerContactPersonDao = require("./CustomerContactPersonDao");


class CustomerDao extends GenericDao {
    CustomerTypeDao
    CustomerCategoryDao
    CustomerActivityDao
    CustomerOriginDao
    ModeDao
    StatusDao
    PayDayDao
    Language
    CustomerAddressDao
    CustomerContactPersonDao
    
    constructor() {
        super(Customer);
        this.PaymentMethodDao = new PaymentMethodDao()
        this.CustomerTypeDao = new CustomerTypeDao()
        this.CustomerCategoryDao = new CustomerCategoryDao()
        this.CustomerActivityDao = new CustomerActivityDao()
        this.CustomerOriginDao = new CustomerOriginDao()
        this.ModeDao = new ModeDao()
        this.StatusDao = new StatusDao()
        this.PayDayDao = new PayDayDao()
        this.Language = new Language()
        this.CustomerAddressDao = new CustomerAddressDao()
        this.CustomerContactPersonDao = new CustomerContactPersonDao()
    }

    async mountObj(data) {
        const idPayDay = await this.PayDayDao.findById(data.idPayDay)
        const idStatus = await this.StatusDao.findById(data.idStatus)
        const idMode = await this.ModeDao.findById(data.idMode)
        const language = await this.Language.findById(data.idLanguage)
        const payment = await this.PaymentMethodDao.findById(data.idPaymentMethod)    
        const type = await this.CustomerTypeDao.findById(data.idCustomerType)
        const category = await this.CustomerCategoryDao.findById(data.idCustomerCategory)
        const activity = await this.CustomerActivityDao.findById(data.idCustomerActivity)
        const origin = await this.CustomerOriginDao.findById(data.idCustomerOrigin)
        const customer = {
            ...data,
            idPayDay: await this.createSelect(idPayDay.base),
            idStatus: await this.createSelect(idStatus.base),
            idMode: await this.createSelect(idMode.base),
            idLanguage: await this.createSelect(language.base),
            idPaymentMethod: await this.createSelect(payment.base ),
            idCustomerType: await this.createSelect(type.base),
            idCustomerCategory: await this.createSelect(category.base),
            idCustomerActivity: await this.createSelect(activity.base),
            idCustomerOrigin: await this.createSelect(origin.base),
            addresses: await this.CustomerAddressDao.findByCustomerId(data.id),
            contacts: await this.CustomerContactPersonDao.findByCustomerId(data.id)
        }
        return new Customer(customer)
    }


    async unMountBase(data) {
        const customer = {
            ...data,
            payDay: await this.undoSelect(data.payDay),
            status: await this.undoSelect(data.status),
            mode: await this.undoSelect(data.mode),
            idLanguage: await this.undoSelect(data.idLanguage),
            idPaymentMethod: await this.undoSelect(data.idPaymentMethod),
            idCustomerType: await this.undoSelect(data.idCustomerType),
            idCustomerCategory: await this.undoSelect(data.idCustomerCategory),
            idCustomerActivity: await this.undoSelect(data.idCustomerActivity),
            idCustomerOrigin: await this.undoSelect(data.idCustomerOrigin)
        }
        return customer
    }

    async unMountAddress(data) {
        const addresses = {
            ...data,
            addressType: await this.undoSelect(data.addressType)
        }
        return addresses
    }

    async unMountContacts(data) {
        const addresses = {
            ...data,
            department: await this.undoSelect(data.department)
        }
        return addresses
    }

    async mountList(data) {
        let contact = await this.CustomerContactPersonDao.findMainContactCustomer(data.id);
        const list = {
            ...data,
            ContactName: contact != undefined ? contact.name : '',
            ContactPhone: contact != undefined ? contact.phone : '',
        }

        const{id, comercialName, CIF, phone, email, ContactName, ContactPhone} =list
        const nObj = {id :id, comercialName :comercialName, CIF: CIF, phone : phone, email: email, ContactName : ContactName, ContactPhone: ContactPhone}
        return nObj
    }

    async createSelect(obj){
        let obj2 = {}
        obj2.value = obj.id
        obj2.label = obj.name
        return obj2
    }

    findCustomer (id) {
        return new Promise((resolve, reject) => { 
            this.db.query('SELECT * FROM customers WHERE id = ? ', [id], (err, result) => {
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

module.exports = CustomerDao