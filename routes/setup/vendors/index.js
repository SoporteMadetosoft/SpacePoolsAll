/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vendors/index.js
    URI: '/setup/vendors/*' 
*/

const express = require('express');
const router = express.Router();

const ControllerType = require('../../../controllers/setup/vendors/VendorType');

router.get('/type/list', ControllerType.list);
router.get('/type/select', ControllerType.select);
router.post('/type/insert', ControllerType.insert);
router.put('/type/update', ControllerType.update);
router.delete('/type/delete/:id', ControllerType.delete);
router.post('/type/find', ControllerType.listByID);
module.exports = router;
