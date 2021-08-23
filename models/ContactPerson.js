class ContactPerson {
    _id
    id
    name
    phone
    email
    charge
    startSchedule
    endSchedule
    defaultContact
    department = []

    constructor({ id, name, phone, email, charge, startSchedule, endSchedule, defaultContact, department }) {
        this._id = '0'
        this.id = id
        this.name = name
        this.phone = phone
        this.email = email
        this.charge = charge
        this.startSchedule = startSchedule
        this.endSchedule = endSchedule
        this.defaultContact = defaultContact
        this.department = department
    }
}
module.exports = ContactPerson