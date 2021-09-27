const express = require('express');
const router = express.Router();

const ControllerTrailer = require('../../controllers/trailer/Trailer')
const ControllerRepair = require('../../controllers/trailer/Repair')

router.get('/list', ControllerTrailer.list);
router.post('/insert', ControllerTrailer.insert);
router.put('/update', ControllerTrailer.update);
router.delete('/delete/:id', ControllerTrailer.delete);
router.post('/find', ControllerTrailer.listByID);
router.get('/findnid', ControllerTrailer.findNId)

router.get('/repair/list', ControllerRepair.list);
router.post('/repair/insert', ControllerRepair.insert);
router.put('/repair/update', ControllerRepair.update);
router.delete('/repair/delete/:id', ControllerRepair.delete);
router.post('/repair/find', ControllerRepair.listByID);

module.exports = router;
