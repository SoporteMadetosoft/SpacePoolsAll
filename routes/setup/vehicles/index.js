/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vehicles/index.js
    URI: '/setup/vehicles/*' 
*/
const ControllerBrand = require('../../../controllers/setup/vehicles/Brand');
const ControllerBrandModel = require('../../../controllers/setup/vehicles/BrandModel');

const express = require('express');
const router = express.Router();

router.get('/brand/list', ControllerBrand.list);
router.get('/brand/select', ControllerBrand.select);
router.post('/brand/insert', ControllerBrand.insert);
router.put('/brand/update', ControllerBrand.update);
router.delete('/brand/delete/:id', ControllerBrand.delete);
router.post('/brand/find', ControllerBrand.listByID);

router.get('/brandModel/list', ControllerBrandModel.list);
router.get('/brandModel/select', ControllerBrandModel.select);
router.get('/brandModel/selectByIdBrand/:id', ControllerBrandModel.selectByIdBrand);
router.post('/brandModel/insert', ControllerBrandModel.insert);
router.put('/brandModel/update', ControllerBrandModel.update);
router.delete('/brandModel/delete/:id', ControllerBrandModel.delete);
router.post('/brandModel/find', ControllerBrandModel.listByID);

module.exports = router;
