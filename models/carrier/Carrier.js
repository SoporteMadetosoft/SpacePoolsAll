class Carrier {
    base = {}
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
        idSstatus,
        filePath
    }) {
        this.base.id = id
        this.base.carrierCode = carrierCode
        this.base.name = name
        this.base.NIF = NIF
        this.base.country = country
        this.base.state = state
        this.base.city = city
        this.base.address = address
        this.base.postcode = postcode
        this.base.email = email
        this.base.phone = phone
        this.base.phone2 = phone2
        this.base.startSchedule = startSchedule
        this.base.endShedule = endShedule
        this.base.idSstatus = idSstatus
        this.base.filePath = filePath
    }
    get table() {
        return this.#table;
    }
}
module.exports = Carrier