/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/

const express = require('express');
const ControllerMkdir = require('../../../controllers/global/MkDir');

const router = express.Router();

router.post('/mkdir', ControllerMkdir.mkdir);

module.exports = router;
