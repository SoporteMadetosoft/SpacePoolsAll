/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/ 

const express = require('express');
const ControllerPayDay = require('../../../controllers/global/PayDay');

const router = express.Router();

router.get('/select', ControllerPayDay.select);

module.exports = router;
