const CustomerDao = require('../../dao/customer/CustomerDao')
const customerDao = new CustomerDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await customerDao.findAll()
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
            data: await customerDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}


exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)

    try {
        await customerDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {

        /** INSERT CUSTOMER */
        const customer = req.body.form
        const addresses = req.body.form.addresses
        const contacts = req.body.form.contacts
        
        delete customer.addresses
        delete customer.contacts
        const insert = await customerDao.insert(customer)
        /** INSERT ADDRESSES**/
        
        customerDao.multipleAccess(addresses, customerDao.CustomerAddressDao, insert.insertId, 'idCustomer')
        /** INSERT CONTACT PERSONS**/
        customerDao.multipleAccess(contacts, customerDao.CustomerContactPersonDao, insert.insertId, 'idCustomer')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE CUSTOMER **/
        const customer = req.body.form
        const addresses = req.body.form.addresses
        const contacts = req.body.form.contacts

        delete customer.addresses
        delete customer.contacts
        customerDao.update(customer)
        /** UPDATE ADDRESSES**/
        customerDao.multipleAccess(addresses, customerDao.CustomerAddressDao, customer.id, 'idCustomer')
        /** UPDATE CONTACT PERSONS**/
        customerDao.multipleAccess(contacts, customerDao.CustomerContactPersonDao, customer.id, 'idCustomer')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
