/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/vendors/index.js
    URI: '/setup/vendors/*' 
*/

const express = require('express');
const router = express.Router();

router.use('/type', require('./type'))

module.exports = router;
