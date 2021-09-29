/*
    Path:  @src/app.js ->  @src/routes/global/index.js
    URI: '/global' 
*/

const express = require('express');
const router = express.Router();

router.use('/language', require('./language'));
router.use('/mode', require('./mode'));
router.use('/status', require('./status'));
router.use('/payday', require('./payday'));
router.use('/fileManager', require('./fileManager'));
router.use('/itemType', require('./itemType'));
router.use('/productionStatus', require('./productionStatus'));


module.exports = router;
