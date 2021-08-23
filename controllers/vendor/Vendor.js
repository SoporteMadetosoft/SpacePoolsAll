const VendorDao = require('../../dao/vendor/VendorDao')
const ContactDao = require('../../dao/vendor/ContactDao')
const AddressDao = require('../../dao/vendor/AddressDao')
const PurchaseDao = require('../../dao/purchase/PurchaseDao')

const vendorDao = new VendorDao()
const contactDao = new ContactDao()
const addressDao = new AddressDao()
const purchaseDao = new PurchaseDao()



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

    try{
        res.json({
            ok:true,
            data: await vendorDao.getSelect() 
        })
    }catch(error){
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
        /** INSERT VENDOR */
        const insert = await vendorDao.insert(req.body.formData.base)
        /** INSERT ADDRESS */
        req.body.repairs.forEach(element => {
            element.vendorId = insert.insertId
            addressDao.insert(element)
        });
        /** INSERT CONTACT */
        req.body.repairs.forEach(element => {
            element.vendorId = insert.insertId
            contactDao.insert(element)
        });
        /** INSERT PURCHASE */
        req.body.repairs.forEach(element => {
            element.vendorId = insert.insertId
            purchaseDao.insert(element)
        });
        

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {

    try {
        /** UPDATE VENDOR */
        vendorDao.update(req.body.formData.base)
        /** UPDATE ADDRESS*/
        req.body.formData.repairs.forEach(element => {
            addressDao.update(element)
        })
        /** UPDATE CONTACT */
        req.body.formData.repairs.forEach(element => {
            contactDao.update(element)
        })
        /** UPDATE PURCHASE */
        req.body.formData.repairs.forEach(element => {
            purchaseDao.update(element)
        })
       
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}