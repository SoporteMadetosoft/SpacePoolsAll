
const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerRole = require('../../controllers/role/Role');

const router = express.Router();

router.get('/list', validarJWT, ControllerRole.list);
router.post('/insert', validarJWT, ControllerRole.insert);
router.put('/update', validarJWT, ControllerRole.update);
router.delete('/delete/:id', validarJWT, ControllerRole.delete);
router.post('/find', validarJWT, ControllerRole.listByID);


module.exports = router;