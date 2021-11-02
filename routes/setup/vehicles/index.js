/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vehicles/index.js
    URI: '/setup/vehicles/*' 
*/

const express = require('express');
const router = express.Router();

router.use('/brand', require('./brand'));
router.use('/model', require('./model'));

module.exports = router;
