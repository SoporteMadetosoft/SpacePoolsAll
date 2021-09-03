const express = require('express');

const ControllerProduction = require('../../controllers/production/Production');

const router = express.Router();

router.get('/list', ControllerProduction.list);
router.post('/insert', ControllerProduction.insert);
router.put('/update', ControllerProduction.update);
router.delete('/delete/:id', ControllerProduction.delete);
router.post('/find', ControllerProduction.listByID);

module.exports = router;