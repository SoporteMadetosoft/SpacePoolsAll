const express = require('express');

const ControllerProduction = require('../../controllers/production/production');

const router = express.Router();

router.get('/list', ControllerProduction.list);
router.get('/select', ControllerProduction.select);
router.post('/insert', ControllerProduction.insert);
router.put('/update', ControllerProduction.update);
router.delete('/delete/:id', ControllerProduction.delete);
router.post('/find', ControllerProduction.listByID);

module.exports = router;