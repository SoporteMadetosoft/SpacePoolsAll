const CustomerDao = require('../../dao/customer/CustomerDao')
const CarrierDocumentsDao = require('../../dao/customer/CustomerDocumentsDao')

const customerDao = new CustomerDao()
const carrierDocumentsDao = new CarrierDocumentsDao()

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
exports.select = async (req, res) => {
    
    try {
        res.json({
            ok: true,
            data: await customerDao.findAllStatus()
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
        const documents = req.body.form.documents

        delete customer.addresses
        delete customer.contacts
        delete customer.documents

        const insert = await customerDao.insert(customer)

        customerDao.multipleAccess(addresses, customerDao.CustomerAddressDao, insert.insertId, 'idCustomer')

        customerDao.multipleAccess(contacts, customerDao.CustomerContactPersonDao, insert.insertId, 'idCustomer')

        customerDao.multipleAccess(documents, carrierDocumentsDao, insert.insertId, 'idCustomer')

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
        const documents = req.body.form.documents

        delete customer.addresses
        delete customer.contacts
        delete customer.documents
        
        customerDao.update(customer)

        customerDao.multipleAccess(addresses, customerDao.CustomerAddressDao, customer.id, 'idCustomer')

        customerDao.multipleAccess(contacts, customerDao.CustomerContactPersonDao, customer.id, 'idCustomer')

        customerDao.multipleAccess(documents, carrierDocumentsDao, customer.id, 'idCustomer')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.findNId= async (req, res) => {
    try {
       
        res.json({ 
            ok: true,
            data: await  customerDao.findAutoincrementID()
         })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}