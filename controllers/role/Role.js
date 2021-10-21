const RoleDao = require('../../dao/role/RoleDao')
const RoleStatusDao = require('../../dao/role/RoleStatusDao')

const roleDao = new RoleDao()
const roleStatusDao = new RoleStatusDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await roleDao.findAll()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.listByID = async (req, res) => {
    const id = parseInt(req.body.id, 10)

    try {
        res.json({
            ok: true,
            data: await roleDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await roleDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT ROLE **/
        const permissions = req.body.form
        const productionStatus = req.body.form.productionStatus

        delete permissions.productionStatus

        const insert = await roleDao.insert(permissions)

        roleDao.multipleAccess(productionStatus, roleStatusDao, insert.insertId, 'idRole')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE ROLE **/
        const permissions = req.body.form
        const productionStatus = req.body.form.productionStatus

        delete permissions.productionStatus

        console.log(productionStatus)
        await roleDao.update(permissions)

        roleDao.multipleAccess(productionStatus, roleStatusDao, permissions.id, 'idRole')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}