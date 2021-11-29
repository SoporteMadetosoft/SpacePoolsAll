class Vendor {
    contacts = []
    addresses = []
    #table = 'vendors'

    constructor({
        id,
        idVendorType,
        idPaymentMethod,
        idOrigin,
        vendorCode,
        comercialName,
        CIF,
        socialReason,
        phone,
        email,
        observations,
        idStatus,
        contacts = [],
        addresses = []
    }) {
        this.id = id
        this.idVendorType = idVendorType
        this.idPaymentMethod = idPaymentMethod
        this.idOrigin = idOrigin
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
    }
    get table() {
        return this.#table;
    }
}
module.exports = Vendor