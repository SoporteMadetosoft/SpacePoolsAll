/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vehicles/model/index.js
    URI: '/setup/vehicles/model' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const ControllerBrandModel = require('../../../../controllers/setup/vehicles/BrandModel');
const router = express.Router();

router.get('/list', validarJWT, ControllerBrandModel.list);
router.get('/selectByIdBrand/:id', validarJWT, ControllerBrandModel.selectByIdBrand);
router.post('/insert', validarJWT, ControllerBrandModel.insert);
router.put('/update', validarJWT, ControllerBrandModel.update);
router.delete('/delete/:id', validarJWT, ControllerBrandModel.delete);
router.post('/find', validarJWT, ControllerBrandModel.listByID);

module.exports = router;
