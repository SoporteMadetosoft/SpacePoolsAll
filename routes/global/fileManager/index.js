/*
    Path:  @src/app.js ->  @src/routes/global/fileManager/index.js
    URI: '/global/fileManager 
*/

const express = require('express');
const ControllerFileManager = require('../../../controllers/global/FileManager');

const router = express.Router();

router.post('/create', ControllerFileManager.create);
router.post('/load', ControllerFileManager.load);

module.exports = router;
