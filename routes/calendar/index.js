/*
    Path:  @src/app.js ->  @src/routes/calendar/index.js
    URI: '/calendar' 
*/

const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerCalendar = require('../../controllers/calendar/Calendar');

const router = express.Router();

router.post('/getEvents', validarJWT, ControllerCalendar.getEvents);

module.exports = router;