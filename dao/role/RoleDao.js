const Role = require("../../models/role/Role");

const GenericDao = require("../GenericDao");


class RoleDao extends GenericDao {
    
    constructor() {
        super(Role);
    }

    async mountObj(data) {
        const role = {
            ...data,
        }

        return new Role(role)
    }

    async mountList(data) {
        const list = {
            ...data,
        }

        const{name} =list
        const nObj = {name :name}
        return nObj
    }

}

module.exports = RoleDao