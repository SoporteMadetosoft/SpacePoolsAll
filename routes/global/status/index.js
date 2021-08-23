/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/ 

const express = require('express');
const ControllerStatus = require('../../../controllers/global/Status');

const router = express.Router();

router.get('/select', ControllerStatus.select);

module.exports = router;
