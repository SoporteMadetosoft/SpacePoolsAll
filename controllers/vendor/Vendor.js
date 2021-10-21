const { CloudWatchLogs } = require('aws-sdk')
const VendorDao = require('../../dao/vendor/VendorDao')

const vendorDao = new VendorDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await vendorDao.findAll()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
exports.select = async (req, res) => {
    console.log('hola2')
    try {
        res.json({
            ok: true,
            data: await vendorDao.findAllStatus()
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
            data: await vendorDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await vendorDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {

        /** INSERT CUSTOMER */
        const vendor = req.body.form
        const addresses = req.body.form.addresses
        const contacts = req.body.form.contacts

        delete vendor.addresses
        delete vendor.contacts
        const newVendor = {
            ...vendor,
            idOrigin: vendor.idOrigin.id
        }
        const insert = await vendorDao.insert(newVendor)
        /** INSERT ADDRESSES**/

        vendorDao.multipleAccess(addresses, vendorDao.AddressDao, insert.insertId, 'idVendor')
        /** INSERT CONTACT PERSONS**/
        vendorDao.multipleAccess(contacts, vendorDao.ContactDao, insert.insertId, 'idVendor')

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {

    try {
        /** UPDATE CUSTOMER **/
        const vendor = req.body.form
        const addresses = req.body.form.addresses
        const contacts = req.body.form.contacts

        delete vendor.addresses
        delete vendor.contacts
        const newVendor = {
            ...vendor,
            idOrigin: vendor.idOrigin.id
        }
        vendorDao.update(newVendor)
        /** UPDATE ADDRESSES**/
        vendorDao.multipleAccess(addresses, vendorDao.AddressDao, vendor.id, 'idVendor')
        /** UPDATE CONTACT PERSONS**/
        vendorDao.multipleAccess(contacts, vendorDao.ContactDao, vendor.id, 'idVendor')

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
            data: await  vendorDao.findAutoincrementID()
         })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}