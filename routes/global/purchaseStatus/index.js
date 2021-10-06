/*
    Path:  @src/app.js ->  @src/routes/global/status/index.js
    URI: '/global/status 
*/

const express = require('express');
const ControllerPurchaseStatus = require('../../../controllers/global/PurchaseStatus');

const router = express.Router();

router.get('/list', ControllerPurchaseStatus.list);

module.exports = router;
