/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/ 

const express = require('express');
const ControllerMode = require('../../../controllers/global/Mode');

const router = express.Router();

router.get('/list', ControllerMode.list);
router.get('/select', ControllerMode.select);
router.post('/insert', ControllerMode.insert);
router.put('/update', ControllerMode.update);
router.delete('/delete/:id', ControllerMode.delete);
router.post('/find', ControllerMode.listByID);

module.exports = router;
