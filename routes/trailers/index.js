const express = require('express');
const router = express.Router();

const ControllerTrailer= require('../../controllers/trailer/Trailer')
const ControllerRepair= require('../../controllers/trailer/Repair')

router.get('/trailer/list', ControllerTrailer.list);
router.post('/trailer/insert', ControllerTrailer.insert);
router.get('/trailer/select', ControllerTrailer.select);
router.put('/trailer/update', ControllerTrailer.update);
router.delete('/trailer/delete/:id', ControllerTrailer.delete);
router.post('/trailer/find', ControllerTrailer.listByID);

router.get('/repair/list', ControllerRepair.list);
router.post('/repair/insert', ControllerRepair.insert);
router.get('/repair/select', ControllerRepair.select);
router.put('/repair/update', ControllerRepair.update);
router.delete('/repair/delete/:id', ControllerRepair.delete);
router.post('/repair/find', ControllerRepair.listByID);

module.exports = router;
