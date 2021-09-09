class ContactPerson {
    constructor({ id, name, phone, email, charge, startSchedule, endSchedule, defaultContact, department }) {
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