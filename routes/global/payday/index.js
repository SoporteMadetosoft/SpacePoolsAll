/*
    Path:  @src/app.js ->  @src/routes/global/payday/index.js
    URI: '/global/payday 
*/

const express = require('express');
const ControllerPayDay = require('../../../controllers/global/PayDay');

const router = express.Router();

router.get('/list', ControllerPayDay.list);

module.exports = router;
