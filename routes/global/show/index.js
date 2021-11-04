/*
    Path:  @src/app.js ->  @src/routes/global/show/index.js
    URI: '/global/show 
*/

const express = require('express');
const ControllerShow = require('../../../controllers/global/Show');

const router = express.Router();

router.get('/list', ControllerShow.list);

module.exports = router;
