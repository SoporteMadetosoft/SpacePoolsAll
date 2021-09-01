/*
    Path:  @src/app.js ->  @src/routes/global/mode/index.js
    URI: '/global/mode 
*/

const express = require('express');
const ControllerMode = require('../../../controllers/global/Mode');

const router = express.Router();

router.get('/list', ControllerMode.list);

module.exports = router;
