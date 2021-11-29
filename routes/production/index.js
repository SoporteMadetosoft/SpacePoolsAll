const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerProduction = require('../../controllers/production/Production');

const router = express.Router();

router.post('/list', validarJWT, ControllerProduction.list);
router.put('/update', validarJWT, ControllerProduction.update);
router.delete('/delete/:id', validarJWT, ControllerProduction.delete);
router.post('/find', validarJWT, ControllerProduction.listByID);

module.exports = router;