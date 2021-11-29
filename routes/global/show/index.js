/*
    Path:  @src/app.js ->  @src/routes/global/show/index.js
    URI: '/global/show 
*/

const express = require('express');
const { validarJWT } = require('../../../middleware/validarJWT');

const ControllerShow = require('../../../controllers/global/Show');

const router = express.Router();

router.get('/list', validarJWT, ControllerShow.list);

module.exports = router;
