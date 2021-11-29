/*
    Path:  @src/app.js ->  @src/routes/global/mode/index.js
    URI: '/global/mode 
*/

const express = require('express');
const { validarJWT } = require('../../../middleware/validarJWT');

const ControllerMode = require('../../../controllers/global/Mode');

const router = express.Router();

router.get('/list', validarJWT, ControllerMode.list);

module.exports = router;
