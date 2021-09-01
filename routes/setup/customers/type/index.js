/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/type/index.js
    URI: '/setup/customers/type' 
*/

const express = require('express');
const router = express.Router();

const ControllerType = require('../../../../controllers/setup/customers/CustomerType');

router.get('/list', ControllerType.list);
router.post('/insert', ControllerType.insert);
router.get('/select', ControllerType.select);
router.put('/update', ControllerType.update);
router.delete('/delete/:id', ControllerType.delete);
router.post('/find', ControllerType.listByID);

module.exports = router;
