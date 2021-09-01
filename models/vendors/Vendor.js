class Vendor {
    contacts = []
    addresses = []
    purchase = []
    #table = 'vendors'

    constructor({
        id,
        idVendorType,
        idPaymentMethod,
        vendorCode,
        comercialName,
        CIF,
        socialReason,
        phone,
        email,
        observations,
        idStatus,
        contacts = [],
        addresses = [],
        purchase = []
    }) {
        this.id = id
        this.idVendorType = idVendorType
        this.idPaymentMethod = idPaymentMethod
        this.vendorCode = vendorCode
        this.comercialName = comercialName
        this.CIF = CIF
        this.socialReason = socialReason
        this.phone = phone
        this.email = email
        this.observations = observations
        this.idStatus = idStatus
        this.contacts = contacts
        this.addresses = addresses
        this.purchase = purchase
    }
    get table() {
        return this.#table;
    }
}
module.exports = Vendor