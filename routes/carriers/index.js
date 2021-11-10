/*
    Path:  @src/app.js ->  @src/routes/carriers/index.js
    URI: '/carriers' 
*/

const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerCarrier = require('../../controllers/carrier/Carrier');

const router = express.Router();

router.get('/list', validarJWT, ControllerCarrier.list);
router.post('/find', validarJWT, ControllerCarrier.listByID);
router.post('/insert', validarJWT, ControllerCarrier.insert);
router.put('/update', validarJWT, ControllerCarrier.update);
router.delete('/delete/:id', validarJWT, ControllerCarrier.delete);
router.get('/findnid', validarJWT, ControllerCarrier.findNId);
router.get('/select', validarJWT, ControllerCarrier.select);

module.exports = router;