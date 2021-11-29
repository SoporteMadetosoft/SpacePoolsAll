const ContactDao = require('../../dao/vendor/ContactDao')

const contactDao = new ContactDao()


exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await contactDao.findAll()
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
            data: await contactDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await contactDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT CONTACT */
        await contactDao.insert(req.body.form)

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        /**UPDATE CONTACT */
        contactDao.update(req.body.form)

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}