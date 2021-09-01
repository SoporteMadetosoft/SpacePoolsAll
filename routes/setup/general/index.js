/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/index.js
    URI: '/setup/general/*'
*/

const express = require('express');

const router = express.Router();

router.use('/addressesTypes', require('./addressesTypes'));
router.use('/paymentMethod', require('./paymentMethod'));
router.use('/department', require('./department'));

module.exports = router;
