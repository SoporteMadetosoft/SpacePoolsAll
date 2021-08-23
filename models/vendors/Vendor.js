class Vendor{
    base = {}
    contact = []
    adresses = []
    purchase = []
    #table = 'vendors'

    constructor({
        id,
        vendorType,
        paymentMethod,
        vendorCode,
        comercialName,
        CIF,
        socialReason,
        phone,
        email,
        observations,
        status,
        contact = [],
        adresses = [],
        purchase = []
    }){
        this.base.id = id
        this.base.vendorType = vendorType
        this.base.paymentMethod = paymentMethod
        this.base.vendorCode = vendorCode
        this.base.comercialName = comercialName
        this.base.CIF = CIF
        this.base.socialReason = socialReason
        this.base.phone = phone
        this.base.email = email
        this.base.observations = observations
        this.base.status = status
        this.contact = contact
        this.adresses = adresses
        this.purchase = purchase
    }
    get table() {
        return this.#table;
    }
}
module.exports = Vendor