const express = require('express');

const ControllerProduction = require('../../controllers/production/Production');

const router = express.Router();

router.post('/list', ControllerProduction.list);
router.put('/update', ControllerProduction.update);
router.delete('/delete/:id', ControllerProduction.delete);
router.post('/find', ControllerProduction.listByID);

module.exports = router;