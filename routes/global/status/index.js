/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/ 

const express = require('express');
const ControllerStatus = require('../../../controllers/global/Status');

const router = express.Router();

router.get('/list', ControllerStatus.list);
router.get('/select', ControllerStatus.select);
router.post('/insert', ControllerStatus.insert);
router.put('/update', ControllerStatus.update);
router.delete('/delete/:id', ControllerStatus.delete);
router.post('/find', ControllerStatus.listByID);

module.exports = router;
