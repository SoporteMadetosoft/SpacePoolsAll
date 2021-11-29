/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/index.js
    URI: '/setup/customers/*' 
*/

const express = require('express');
const router = express.Router();

router.use('/type', require('./type'));
router.use('/activities', require('./activities'));
router.use('/category', require('./category'));
router.use('/origin', require('./origin'));

module.exports = router;
