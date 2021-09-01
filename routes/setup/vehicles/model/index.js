/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vehicles/model/index.js
    URI: '/setup/vehicles/model' 
*/
const ControllerBrandModel = require('../../../../controllers/setup/vehicles/BrandModel');

const express = require('express');
const router = express.Router();

router.get('/list', ControllerBrandModel.list);
router.get('/select', ControllerBrandModel.select);
router.get('/selectByIdBrand/:id', ControllerBrandModel.selectByIdBrand);
router.post('/insert', ControllerBrandModel.insert);
router.put('/update', ControllerBrandModel.update);
router.delete('/delete/:id', ControllerBrandModel.delete);
router.post('/find', ControllerBrandModel.listByID);

module.exports = router;
