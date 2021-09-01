/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vehicles/brand/index.js
    URI: '/setup/vehicles/brand' 
*/
const ControllerBrand = require('../../../../controllers/setup/vehicles/Brand');

const express = require('express');
const router = express.Router();

router.get('/list', ControllerBrand.list);
router.post('/insert', ControllerBrand.insert);
router.put('/update', ControllerBrand.update);
router.delete('/delete/:id', ControllerBrand.delete);
router.post('/find', ControllerBrand.listByID);


module.exports = router;
