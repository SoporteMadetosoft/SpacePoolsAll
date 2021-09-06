class Customer {
    addresses = []
    contacts = []
    #table = 'customers'

    constructor({
        id,
        customerCode,
        comercialName,
        CIF,
        socialReason,
        phone,
        email,
        observations,
        accountNumber,
        idPayDay,
        idStatus,
        idMode,
        idLanguage,
        idPaymentMethod,
        idCustomerCategory,
        idCustomerType,
        idCustomerActivity,
        idCustomerOrigin,
        addresses = [],
        contacts = []
    }) {
        this.id = id
        this.customerCode = customerCode
        this.comercialName = comercialName
        this.CIF = CIF
        this.socialReason = socialReason
        this.phone = phone
        this.email = email
        this.observations = observations
        this.accountNumber = accountNumber
        this.idPayDay = idPayDay
        this.idStatus = idStatus
        this.idMode = idMode
        this.idLanguage = idLanguage
        this.idPaymentMethod = idPaymentMethod
        this.idCustomerType = idCustomerType
        this.idCustomerCategory = idCustomerCategory
        this.idCustomerActivity = idCustomerActivity
        this.idCustomerOrigin = idCustomerOrigin
        this.addresses = addresses
        this.contacts = contacts
    }
    get table() {
        return this.#table;
    }
}
module.exports = Customer