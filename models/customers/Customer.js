class Customer {
    base={}
    addresses = []
    contactPersons = []
    #table = 'customers'

    constructor({
        id,
        customerCode,
        comercialName,
        comercialNum,
        CIF,
        socialReason,
        phone,
        email,
        observations,
        accountNumber,
        payDay,
        status,
        mode,
        idLanguage,
        idPaymentMethod,
        idCustomerCategory,
        idCustomerType,
        idCustomerActivity,
        idCustomerOrigin,
        addresses = [],
        contactPersons = []
    }) {
        this.base.id = id
        this.base.customerCode = customerCode
        this.base.comercialName = comercialName
        this.base.comercialNum = comercialNum
        this.base.CIF = CIF
        this.base.socialReason = socialReason
        this.base.phone = phone
        this.base.email = email
        this.base.observations = observations
        this.base.accountNumber = accountNumber
        this.base.payDay = payDay
        this.base.status = status
        this.base.mode = mode
        this.base.idLanguage = idLanguage
        this.base.idPaymentMethod = idPaymentMethod
        this.base.idCustomerType = idCustomerType
        this.base.idCustomerCategory = idCustomerCategory
        this.base.idCustomerActivity = idCustomerActivity
        this.base.idCustomerOrigin = idCustomerOrigin
        this.addresses = addresses
        this.contactPersons = contactPersons
    }
    get table() {
        return this.#table;
    }
}
module.exports = Customer