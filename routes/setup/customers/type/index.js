/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/type/index.js
    URI: '/setup/customers/type' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const router = express.Router();

const ControllerType = require('../../../../controllers/setup/customers/CustomerType');

router.get('/list', validarJWT, ControllerType.list);
router.post('/insert', validarJWT, ControllerType.insert);
router.put('/update', validarJWT, ControllerType.update);
router.delete('/delete/:id', validarJWT, ControllerType.delete);
router.post('/find', validarJWT, ControllerType.listByID);

module.exports = router;
