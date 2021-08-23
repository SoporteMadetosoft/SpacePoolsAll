class User{
    base = {}
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
    }){
        this.base.id = id
        this.base.idRole = idRole
        this.base.username = username
        this.base.login = login
        this.base.group = group
        this.base.email = email
        this.base.phone = phone
        this.base.password = password
        this.base.status = status
    }
    get table() {
        return this.#table;
    }
}
module.exports = User