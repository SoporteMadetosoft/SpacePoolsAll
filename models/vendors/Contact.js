class Contact{
    base ={}
    #table = 'vendors_contact'

    constructor({
        id,
        vendorId,
        department,
        name,
        phone,
        email,
        position,
        startSchedule,
        endSchedule,
        defaultContact
    }){
        this.base.id = id
        this.base.vendorId = vendorId
        this.base.department = department
        this.base.name = name
        this.base.phone = phone
        this.base.email = email
        this.base.position = position
        this.base.startSchedule = startSchedule
        this.base.endSchedule = endSchedule
        this.base.defaultContact = defaultContact
    }
    get table() {
        return this.#table;
    }
}
module.exports = Contact