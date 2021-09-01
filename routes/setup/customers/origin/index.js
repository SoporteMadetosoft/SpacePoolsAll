/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/origin/index.js
    URI: '/setup/customers/origin' 
*/

const express = require('express');
const router = express.Router();

const ControllerOrigin = require('../../../../controllers/setup/customers/Origin');

router.get('/list', ControllerOrigin.list);
router.post('/insert', ControllerOrigin.insert);
router.put('/update', ControllerOrigin.update);
router.delete('/delete/:id', ControllerOrigin.delete);
router.post('/find', ControllerOrigin.listByID);


module.exports = router;
