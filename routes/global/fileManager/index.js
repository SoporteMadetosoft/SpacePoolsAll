/*
    Path:  @src/app.js ->  @src/routes/global/fileManager/index.js
    URI: '/global/fileManager 
*/

const express = require('express');
const { validarJWT } = require('../../../middleware/validarJWT');

const ControllerFileManager = require('../../../controllers/global/FileManager');

const router = express.Router();

router.post('/create', validarJWT, ControllerFileManager.create);
router.post('/load', validarJWT, ControllerFileManager.load);
router.post('/upload', validarJWT, ControllerFileManager.upload);
router.post('/delete', validarJWT, ControllerFileManager.delete);

module.exports = router;
