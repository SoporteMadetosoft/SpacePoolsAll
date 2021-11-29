/*
    Path: @src/routes/setup/index.js -> @src/routes/vendors/index.js
    URI: '/vendors' 
*/

const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerVendors = require('../../controllers/vendor/Vendor');

const router = express.Router();

router.get('/list', validarJWT, ControllerVendors.list);
router.post('/insert', validarJWT, ControllerVendors.insert);
router.put('/update', validarJWT, ControllerVendors.update);
router.delete('/delete/:id', validarJWT, ControllerVendors.delete);
router.post('/find', validarJWT, ControllerVendors.listByID);
router.get('/findnid', validarJWT, ControllerVendors.findNId);
router.get('/select', validarJWT, ControllerVendors.select)

module.exports = router;