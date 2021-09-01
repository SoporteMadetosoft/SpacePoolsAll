class User {
    #table = 'users'

    constructor({
        id,
        idRole,
        username,
        login,
        group,
        email,
        phone,
        password,
        status
    }) {
        this.id = id
        this.idRole = idRole
        this.username = username
        this.login = login
        this.group = group
        this.email = email
        this.phone = phone
        this.password = password
        this.status = status
    }
    get table() {
        return this.#table;
    }
}
module.exports = User