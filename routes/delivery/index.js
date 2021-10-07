/*
    Path:  @src/app.js ->  @src/routes/delivery/index.js
    URI: '/delivery' 
*/

const express = require('express');
const Controller = require('../../controllers/delivery/Delivery.js');

const router = express.Router();

router.get('/list', Controller.list);
router.post('/find', Controller.listByID);

module.exports = router;