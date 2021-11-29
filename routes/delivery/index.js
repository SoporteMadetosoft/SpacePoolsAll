/*
    Path:  @src/app.js ->  @src/routes/delivery/index.js
    URI: '/delivery' 
*/

const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const Controller = require('../../controllers/delivery/Delivery.js');

const router = express.Router();

router.post('/list', validarJWT, Controller.list);
router.post('/find', validarJWT, Controller.listByID);
router.post('/insert', validarJWT, Controller.insert);
router.put('/update', validarJWT, Controller.update);


module.exports = router;