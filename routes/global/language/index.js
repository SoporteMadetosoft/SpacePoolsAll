/*
    Path:  @src/app.js ->  @src/routes/global/language/index.js
    URI: '/global/language 
*/

const express = require('express');
const ControllerLenguage = require('../../../controllers/global/Language');

const router = express.Router();

router.get('/select', ControllerLenguage.select);

module.exports = router;
