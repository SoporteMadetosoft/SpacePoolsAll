const express = require('express');

const ControllerProduction = require('../../controllers/production/Production');

const router = express.Router();

router.get('/list', ControllerProduction.list);
router.put('/update', ControllerProduction.update);
router.delete('/switchStart/:id', ControllerProduction.switchStart);
router.delete('/delete/:id', ControllerProduction.delete);
router.post('/find', ControllerProduction.listByID);

module.exports = router;