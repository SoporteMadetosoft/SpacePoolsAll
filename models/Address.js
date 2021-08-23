class Address {

    _id
    id
    defaultAddress
    addressType
    address
    population
    province
    postcode

    constructor({ id, defaultAddress, addressType, address, population, province, postcode }) {
        this._id = '0'
        this.id = id
        this.defaultAddress = defaultAddress
        this.addressType = addressType
        this.address = address
        this.population = population
        this.province = province
        this.postcode = postcode
    }

}
module. exports = Address