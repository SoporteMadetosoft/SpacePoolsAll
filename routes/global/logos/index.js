/*
    Path:  @src/app.js ->  @src/routes/global/logos/index.js
    URI: '/global/logos 
*/

const express = require('express');
const { validarJWT } = require('../../../middleware/validarJWT');

const ControllerLogos = require('../../../controllers/global/Logos');

const router = express.Router();

router.get('/list', validarJWT, ControllerLogos.list);

module.exports = router;
