/*
    Path:  @src/app.js ->  @src/routes/global/status/index.js
    URI: '/global/status 
*/

const express = require('express');
const ControllerStatus = require('../../../controllers/global/Status');

const router = express.Router();

router.get('/select', ControllerStatus.select);

module.exports = router;
