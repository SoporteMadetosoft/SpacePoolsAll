const Logs = require("../../models/logs/Logs");
const GenericDao = require("../GenericDao");
const UserDao = require("../user/UserDao");

class LogDao extends GenericDao {
    constructor() {
        super(Logs)
        this.UserDao = new UserDao()
    }

    async mountObj(data) {
        return new Logs(data)
    }

    async mountList(data) {
        const u = await this.UserDao.findById(data.idUser)
        const logList = {
            ...data,
            usuario: u.fullname,
            logDate: this.datetimeToEuropeDate(data.logDate)
        }
        return logList

    }
}
module.exports = LogDao