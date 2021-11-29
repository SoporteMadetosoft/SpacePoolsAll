/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/origin/index.js
    URI: '/setup/customers/origin' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const router = express.Router();

const ControllerOrigin = require('../../../../controllers/setup/customers/Origin');

router.get('/list', validarJWT, ControllerOrigin.list);
router.post('/insert', validarJWT, ControllerOrigin.insert);
router.put('/update', validarJWT, ControllerOrigin.update);
router.delete('/delete/:id', validarJWT, ControllerOrigin.delete);
router.post('/find', validarJWT, ControllerOrigin.listByID);


module.exports = router;
