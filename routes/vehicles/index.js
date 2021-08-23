
const express = require('express');

const ControllerVehicle = require('../../controllers/vehicles/Vehicles');
const ControllerRepair = require('../../controllers/vehicles/Repair');

const router = express.Router();

router.get('/vehicle/list', ControllerVehicle.list);
router.get('/vehicle/select', ControllerVehicle.select);
router.post('/vehicle/insert', ControllerVehicle.insert);
router.put('/vehicle/update', ControllerVehicle.update);
router.delete('/vehicle/delete/:id', ControllerVehicle.delete);
router.post('/vehicle/find', ControllerVehicle.listByID);

router.get('/repair/list', ControllerRepair.list);
router.get('/repair/select', ControllerRepair.select);
router.post('/repair/insert', ControllerRepair.insert);
router.put('/repair/update', ControllerRepair.update);
router.delete('/repair/delete/:id', ControllerRepair.delete);
router.post('/repair/find', ControllerRepair.listByID);

module.exports = router;