class Carrier {
    #table = 'carriers'

    constructor({
        id,
        carrierCode,
        name,
        NIF,
        country,
        state,
        city,
        address,
        postcode,
        email,
        phone,
        phone2,
        startSchedule,
        endShedule,
        idStatus,
        filePath
    }) {
        this.id = id
        this.carrierCode = carrierCode
        this.name = name
        this.NIF = NIF
        this.country = country
        this.state = state
        this.city = city
        this.address = address
        this.postcode = postcode
        this.email = email
        this.phone = phone
        this.phone2 = phone2
        this.startSchedule = startSchedule
        this.endShedule = endShedule
        this.idStatus = idStatus
        this.filePath = filePath
    }
    get table() {
        return this.#table;
    }
}
module.exports = Carrier