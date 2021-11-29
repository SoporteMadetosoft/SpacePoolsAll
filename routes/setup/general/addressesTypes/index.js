/*
    Path:  @src/app.js ->  @src/routes/setup/general/addressesTypes/index.js
    URI: '/setup/general/addressesTypes' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const ControllerAT = require('../../../../controllers/setup/general/AddressesTypes');

const router = express.Router();

router.get('/list', validarJWT, ControllerAT.list);
router.post('/insert', validarJWT, ControllerAT.insert);
router.put('/update', validarJWT, ControllerAT.update);
router.delete('/delete/:id', validarJWT, ControllerAT.delete);
router.post('/find', validarJWT, ControllerAT.listByID);

module.exports = router;
