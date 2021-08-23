class Vendor{
    base = {}
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
        contacts= [],
        addresses = [],
        purchase = []
    }){
        this.base.id = id
        this.base.idVendorType = idVendorType
        this.base.idPaymentMethod = idPaymentMethod
        this.base.vendorCode = vendorCode
        this.base.comercialName = comercialName
        this.base.CIF = CIF
        this.base.socialReason = socialReason
        this.base.phone = phone
        this.base.email = email
        this.base.observations = observations
        this.base.idStatus = idStatus
        this.contacts = contacts
        this.addresses = addresses
        this.purchase = purchase
    }
    get table() {
        return this.#table;
    }
}
module.exports = Vendor