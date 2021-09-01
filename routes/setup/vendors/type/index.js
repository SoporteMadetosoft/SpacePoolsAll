/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vendors/type/index.js
    URI: '/setup/vendors/type' 
*/

const express = require('express');
const router = express.Router();

const ControllerType = require('../../../../controllers/setup/vendors/VendorType');

router.get('/list', ControllerType.list);
router.post('/insert', ControllerType.insert);
router.put('/update', ControllerType.update);
router.delete('/delete/:id', ControllerType.delete);
router.post('/find', ControllerType.listByID);
module.exports = router;
