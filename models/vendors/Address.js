class Address{
    base = {}
    #table = 'vendors_addresses'

    constructor({
        id,
        vendorId,
        addressType,
        address,
        town,
        state,
        postcode,
        defaultAdress
    }){
        this.base.id = id
        this.base.vendorId = vendorId
        this.base.addressType = addressType 
        this.base.address = address 
        this.base.town = town
        this.base.state = state
        this.base.postcode = postcode
        this.base.defaultAdress = defaultAdress
    }
    get table() {
        return this.#table;
    }
}
module.exports = Address