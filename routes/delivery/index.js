/*
    Path:  @src/app.js ->  @src/routes/delivery/index.js
    URI: '/delivery' 
*/

const express = require('express');
const Controller = require('../../controllers/delivery/Delivery.js');

const router = express.Router();

router.get('/list', Controller.list);
router.post('/find', Controller.listByID);
router.post('/insert', Controller.insert);
// router.put('/update', Controller.update);


module.exports = router;