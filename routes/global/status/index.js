/*
    Path:  @src/app.js ->  @src/routes/global/status/index.js
    URI: '/global/status 
*/

const express = require('express');
const { validarJWT } = require('../../../middleware/validarJWT');

const ControllerStatus = require('../../../controllers/global/Status');

const router = express.Router();

router.get('/list', validarJWT, ControllerStatus.list);

module.exports = router;
