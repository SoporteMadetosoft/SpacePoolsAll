/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/items/index.js
    URI: '/setup/items/*' 
*/

const express = require('express');
const router = express.Router();

router.use('/place', require('./place'));
router.use('/colors', require('./colors'));

module.exports = router;
