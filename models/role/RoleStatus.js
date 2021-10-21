class RoleStatus {
    #table = 'role_production_status'

    constructor({
        id,
        idRole,
        idStatus
    }) {
        this.id = id
        this.idRole = idRole
        this.idStatus = idStatus
    }
    get table() {
        return this.#table;
    }
}
module.exports = RoleStatus