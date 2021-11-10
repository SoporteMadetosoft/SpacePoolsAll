/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vendors/type/index.js
    URI: '/setup/vendors/type' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const router = express.Router();

const ControllerType = require('../../../../controllers/setup/vendors/VendorType');

router.get('/list', validarJWT, ControllerType.list);
router.post('/insert', validarJWT, ControllerType.insert);
router.put('/update', validarJWT, ControllerType.update);
router.delete('/delete/:id', validarJWT, ControllerType.delete);
router.post('/find', validarJWT, ControllerType.listByID);
module.exports = router;
