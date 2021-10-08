const Customer = require("../../models/customers/Customer");

const GenericDao = require("../GenericDao");

const PaymentMethodDao = require("../setup/general/PaymentMethodDao");
const CustomerTypeDao = require("../setup/customer/CustomerTypeDao");
const CustomerCategoryDao = require("../setup/customer/CustomerCategoryDao");
const CustomerActivityDao = require("../setup/customer/CustomerActivityDao");
const OriginDao = require("../setup/general/OriginDao");

const ModeDao = require("../global/ModeDao");
const StatusDao = require("../global/StatusDao");
const PayDayDao = require("../global/PayDayDao");
const Language = require("../global/LanguageDao");

const CustomerAddressDao = require("../customer/CustomerAddressDao");
const CustomerContactPersonDao = require("./CustomerContactPersonDao");
const CustomerDocumentsDao = require("./CustomerDocumentsDao");
const FileManagerDao = require("../global/FileManagerDao");


class CustomerDao extends GenericDao {
    constructor() {
        super(Customer);
        this.PaymentMethodDao = new PaymentMethodDao()
        this.CustomerTypeDao = new CustomerTypeDao()
        this.CustomerCategoryDao = new CustomerCategoryDao()
        this.CustomerActivityDao = new CustomerActivityDao()
        this.OriginDao = new OriginDao()
        this.ModeDao = new ModeDao()
        this.StatusDao = new StatusDao()
        this.PayDayDao = new PayDayDao()
        this.Language = new Language()
        this.CustomerAddressDao = new CustomerAddressDao()
        this.CustomerContactPersonDao = new CustomerContactPersonDao()
        this.FileManagerDao = new FileManagerDao(CustomerDocumentsDao)
    }

    async mountObj(data) {
        const customer = {
            ...data,
            idPayDay: await this.PayDayDao.findById(data.idPayDay),
            idStatus: await this.StatusDao.findById(data.idStatus),
            idMode: await this.ModeDao.findById(data.idMode),
            idLanguage: await this.Language.findById(data.idLanguage),
            idPaymentMethod: await this.PaymentMethodDao.findById(data.idPaymentMethod),
            idCustomerType: await this.CustomerTypeDao.findById(data.idCustomerType),
            idCustomerCategory: await this.CustomerCategoryDao.findById(data.idCustomerCategory),
            idCustomerActivity: await this.CustomerActivityDao.findById(data.idCustomerActivity),
            idCustomerOrigin: await this.OriginDao.findById(data.idCustomerOrigin),
            addresses: await this.CustomerAddressDao.findByCustomerId(data.id),
            contacts: await this.CustomerContactPersonDao.findByCustomerId(data.id),
            documents: await this.FileManagerDao.getDocumentsInfo(data.filePath)
        }
        return new Customer(customer)
    }

    async mountList(data) {
        let contact = await this.CustomerContactPersonDao.findMainContactCustomer(data.id);
        const list = {
            ...data,
            ContactName: contact != undefined ? contact.name : '',
            ContactPhone: contact != undefined ? contact.phone : '',
        }

        const { id, customerCode, comercialName, CIF, phone, email, ContactName, ContactPhone, idMode, idStatus } = list
        const nObj = { id, customerCode, comercialName, CIF, phone, email, ContactName, ContactPhone, idMode, idStatus }
        return nObj
    }

    findCustomer(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM customers WHERE id = ? ', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result[0])

                }
            })
        })
    }

    findCustomerNameBy(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT comercialName FROM customers WHERE id = ? ', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result[0].comercialName)

                }
            })
        })
    }

}

module.exports = CustomerDao