class User {
    #table = 'users'

    constructor({
        id,
        idStatus,
        idRole,
        fullname,
        login,
        email,
        phone
    }) {
        this.id = id
        this.idStatus = idStatus
        this.idRole = idRole
        this.fullname = fullname
        this.login = login
        this.email = email
        this.phone = phone
    }
    get table() {
        return this.#table;
    }
}
module.exports = User