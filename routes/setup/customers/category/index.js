/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/category/index.js
    URI: '/setup/customers/category' 
*/

const express = require('express');
const router = express.Router();

const ControllerCategory = require('../../../../controllers/setup/customers/CustomerCategory');

router.get('/list', ControllerCategory.list);
router.post('/insert', ControllerCategory.insert);
router.get('/select', ControllerCategory.select);
router.put('/update', ControllerCategory.update);
router.delete('/delete/:id', ControllerCategory.delete);
router.post('/find', ControllerCategory.listByID);

module.exports = router;
