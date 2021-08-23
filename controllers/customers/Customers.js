
const CustomerContactPersonDao = require('../../dao/customer/CustomerContactPersonDao')
const CustomerAddressDao = require('../../dao/customer/CustomerAddressDao')
const CustomerDao = require('../../dao/customer/CustomerDao')
const CustomerLanguage = require('../../models/setup/customer/CustomerLanguage')

const customerDao = new CustomerDao()
const customerAddressDao = new CustomerAddressDao()
const contactPersonsDao = new CustomerContactPersonDao()

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
        /** INSERT CUSTOMER **/

        const base = await customerDao.unMountBase(req.body.formData.base)
        const insert = await customerDao.insert(base)
        
        /** INSERT ADDRESSES**/
        req.body.formData.addresses.forEach(async (element) => {
            element.idCustomer = insert.insertId
            const addresses = await customerDao.unMountAddress(element)
            customerAddressDao.insert(addresses)
        });

        // /** INSERT CONTACT PERSONS**/
        req.body.formData.contactPersons.forEach(async (element) => {
            element.idCustomer = insert.insertId
            const contacts = await customerDao.unMountContacts(element)
            contactPersonsDao.insert(contacts)
        });

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE CUSTOMER **/
        const base = await customerDao.unMountBase(req.body.formData.base)
        
        customerDao.update(base)
        /** UPDATE ADDRESSES **/
        req.body.formData.addresses.forEach(async (element) => {
            const address = await customerDao.unMountAddress(element)
            if (address.id) {
                customerAddressDao.update(address)
            } else {
                element.idCustomer = insert.address.idCustomer
                customerAddressDao.insert(address)
            }
        })
        // /** UPDATE CONTACT PERSONS **/
        req.body.formData.contactPersons.forEach(async (element) => {
            const contacts = await customerDao.unMountContacts(element)
            contactPersonsDao.update(contacts)
        })
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}