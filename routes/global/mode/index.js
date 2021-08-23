/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/ 

const express = require('express');
const ControllerMode = require('../../../controllers/global/Mode');

const router = express.Router();

router.get('/select', ControllerMode.select);

module.exports = router;
