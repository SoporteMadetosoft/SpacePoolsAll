/*
    Path:  @src/app.js ->  @src/routes/setup/index.js
    URI: '/setup' 
*/

const express = require('express');
const router = express.Router();

router.use('/general', require('./general/index'));
router.use('/customers', require('./customers/index'));
router.use('/vendors', require('./vendors/index'));
router.use('/vehicles', require('./vehicles/index'));
router.use('/items', require('./items/index'));

module.exports = router;
    