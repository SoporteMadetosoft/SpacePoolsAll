
const express = require('express');

const ControllerVehicle = require('../../controllers/vehicles/Vehicles');
const ControllerRepair = require('../../controllers/vehicles/Repair');

const router = express.Router();

router.get('/list', ControllerVehicle.list);
router.get('/select', ControllerVehicle.select);
router.post('/insert', ControllerVehicle.insert);
router.put('/update', ControllerVehicle.update);
router.delete('/delete/:id', ControllerVehicle.delete);
router.post('/find', ControllerVehicle.listByID);

router.get('/repair/list', ControllerRepair.list);
router.get('/repair/select', ControllerRepair.select);
router.post('/repair/insert', ControllerRepair.insert);
router.put('/repair/update', ControllerRepair.update);
router.delete('/repair/delete/:id', ControllerRepair.delete);
router.post('/repair/find', ControllerRepair.listByID);

module.exports = router;