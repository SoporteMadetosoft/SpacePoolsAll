const User = require("../../models/user/User");
const GenericDao = require("../GenericDao");

const StatusDao = require("../global/StatusDao");


class UserDao extends GenericDao {
    constructor() {
        super(User);
        this.StatusDao = new StatusDao()
    }

    async mountObj(data) {
        const user = {
            ...data,
            status: await this.StatusDao.findById(data.status)
        }
        return new User(user)
    }

    async mountList(data) {
        const list = {
            ...data,
        }

        const { name, login, group, status } = list
        const nObj = { name: name, login: login, group: group, status: status }
        return nObj
    }
}
module.exports = UserDao