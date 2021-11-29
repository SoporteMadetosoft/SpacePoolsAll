/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vehicles/brand/index.js
    URI: '/setup/vehicles/brand' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const ControllerBrand = require('../../../../controllers/setup/vehicles/Brand');
const router = express.Router();

router.get('/list', validarJWT, ControllerBrand.list);
router.post('/insert', validarJWT, ControllerBrand.insert);
router.put('/update', validarJWT, ControllerBrand.update);
router.delete('/delete/:id', validarJWT, ControllerBrand.delete);
router.post('/find', validarJWT, ControllerBrand.listByID);


module.exports = router;
