/*
    Path: @src/routes/setup/index.js -> @src/routes/trailers/index.js
    URI: '/trailers' 
*/

const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const router = express.Router();

const ControllerTrailer = require('../../controllers/trailer/Trailer')
const ControllerRepair = require('../../controllers/trailer/Repair')

router.get('/list', validarJWT, ControllerTrailer.list);
router.post('/insert', validarJWT, ControllerTrailer.insert);
router.put('/update', validarJWT, ControllerTrailer.update);
router.delete('/delete/:id', validarJWT, ControllerTrailer.delete);
router.post('/find', validarJWT, ControllerTrailer.listByID);
router.get('/findnid', validarJWT, ControllerTrailer.findNId)

router.get('/repair/list', validarJWT, ControllerRepair.list);
router.post('/repair/insert', validarJWT, ControllerRepair.insert);
router.put('/repair/update', validarJWT, ControllerRepair.update);
router.delete('/repair/delete/:id', validarJWT, ControllerRepair.delete);
router.post('/repair/find', validarJWT, ControllerRepair.listByID);
router.get('/repair/findnid', validarJWT, ControllerRepair.findNId);

module.exports = router;
