/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/ 

const express = require('express');
const ControllerLenguage = require('../../../controllers/global/Language');

const router = express.Router();

router.get('/select', ControllerLenguage.select);

module.exports = router;
