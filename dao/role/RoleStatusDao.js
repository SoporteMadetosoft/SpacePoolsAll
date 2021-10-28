const RoleStatus = require("../../models/role/RoleStatus");
const GenericDao = require("../GenericDao");
const ProductionStatusDao = require("../global/ProductionStatusDao");

class RoleStatusDao extends GenericDao {
    constructor() {
        super(RoleStatus)
        this.ProductionStatusDao = new ProductionStatusDao()
    }

    async mountObj(data) {
        return new RoleStatus(data)
    }

    async mountStatus(data) {
        console.log(data)
        const { name } = await this.ProductionStatusDao.findById(data.idStatus)
        const status = {
            id: data.idStatus,
            name
        }
        return status
    }

    findByRoleId(id) {
        // console.log(`SELECT idColor FROM item_colors WHERE idItem = ${id}`)
        return new Promise((resolve, reject) => {
            this.db.query('SELECT idStatus FROM role_production_status WHERE idRole = ?', [id], async (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const statusList = []
                    for (const status of result) {
                        statusList.push(await this.mountStatus(status))
                    }
                    resolve(statusList)
                }
            })
        })
    }


}
module.exports = RoleStatusDao