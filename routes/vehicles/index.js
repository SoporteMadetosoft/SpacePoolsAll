/*
    Path: @src/routes/setup/index.js -> @src/routes/vehicles/index.js
    URI: '/vehicles' 
*/

const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerVehicle = require('../../controllers/vehicles/Vehicles');
const ControllerRepair = require('../../controllers/vehicles/Repair');

const router = express.Router();

router.get('/list', validarJWT, ControllerVehicle.list);
router.post('/insert', validarJWT, ControllerVehicle.insert);
router.put('/update', validarJWT, ControllerVehicle.update);
router.delete('/delete/:id', validarJWT, ControllerVehicle.delete);
router.post('/find', validarJWT, ControllerVehicle.listByID);
router.get('/findnid', validarJWT, ControllerVehicle.findNId)

router.get('/repair/list', validarJWT, ControllerRepair.list);
router.post('/repair/insert', validarJWT, ControllerRepair.insert);
router.put('/repair/update', validarJWT, ControllerRepair.update);
router.delete('/repair/delete/:id', validarJWT, ControllerRepair.delete);
router.post('/repair/find', validarJWT, ControllerRepair.listByID);
router.get('/repair/findnid', validarJWT, ControllerRepair.findNId);

module.exports = router;