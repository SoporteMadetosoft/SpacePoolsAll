const express = require('express');

const ControllerVendors = require('../../controllers/vendor/Vendor');

const router = express.Router();

router.get('/list', ControllerVendors.list);
router.get('/select', ControllerVendors.select);
router.post('/insert', ControllerVendors.insert);
router.put('/update', ControllerVendors.update);
router.delete('/delete/:id', ControllerVendors.delete);
router.post('/find', ControllerVendors.listByID);

module.exports = router;