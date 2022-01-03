/*
    Path:  @src/app.js ->  @src/routes/global/forgotPassword/index.js
    URI: '/global/forgotPassword 
*/

const express = require('express');

const ControllerForgotPassword = require('../../../controllers/global/ForgotPassword');

const router = express.Router();

router.post('/send', ControllerForgotPassword.send);

module.exports = router;
