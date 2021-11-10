/*
    Path:  @src/app.js ->  @src/routes/global/language/index.js
    URI: '/global/language 
*/

const express = require('express');
const { validarJWT } = require('../../../middleware/validarJWT');

const ControllerLenguage = require('../../../controllers/global/Language');

const router = express.Router();

router.get('/list', validarJWT, ControllerLenguage.list);

module.exports = router;
