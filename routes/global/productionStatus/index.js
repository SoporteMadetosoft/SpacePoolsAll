/*
    Path:  @src/app.js ->  @src/routes/global/status/index.js
    URI: '/global/status 
*/

const express = require('express');
const ControllerProductionStatus = require('../../../controllers/global/ProductionStatus');

const router = express.Router();

router.get('/list', ControllerProductionStatus.list);

module.exports = router;
