const express = require('express');

const ControllerCarrier = require('../../controllers/carrier/Carrier');

const router = express.Router();


router.get('/list', ControllerCarrier.list);
router.get('/select', ControllerCarrier.select);
router.post('/insert', ControllerCarrier.insert);
router.put('/update', ControllerCarrier.update);
router.delete('/delete/:id', ControllerCarrier.delete);
router.post('/find', ControllerCarrier.listByID);

module.exports = router;