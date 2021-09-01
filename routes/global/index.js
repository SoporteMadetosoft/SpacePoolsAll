/*
    Path:  @src/app.js ->  @src/routes/global/index.js
    URI: '/global' 
*/

const express = require('express');
const router = express.Router();

router.use('/language', require('./language/index'));
router.use('/mode', require('./mode/index'));
router.use('/status', require('./status/index'));
router.use('/payday', require('./payday/index'));
router.use('/fileManager', require('./fileManager/index'));


module.exports = router;
