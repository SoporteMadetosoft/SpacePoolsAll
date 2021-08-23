/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/ 

const express = require('express');
const ControllerLenguage = require('../../../controllers/global/Language');

const router = express.Router();

router.get('/list', ControllerLenguage.list);
router.get('/select', ControllerLenguage.select);
router.post('/insert', ControllerLenguage.insert);
router.put('/update', ControllerLenguage.update);
router.delete('/delete/:id', ControllerLenguage.delete);
router.post('/find', ControllerLenguage.listByID);

module.exports = router;
