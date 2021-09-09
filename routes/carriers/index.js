/*
    Path:  @src/app.js ->  @src/routes/carriers/index.js
    URI: '/carriers' 
*/

const express = require('express');
const ControllerCarrier = require('../../controllers/carrier/Carrier');

const router = express.Router();

router.get('/list', ControllerCarrier.list);
router.post('/find', ControllerCarrier.listByID);
router.post('/insert', ControllerCarrier.insert);
router.put('/update', ControllerCarrier.update);
router.delete('/delete/:id', ControllerCarrier.delete);

module.exports = router;