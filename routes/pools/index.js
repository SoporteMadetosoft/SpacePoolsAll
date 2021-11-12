const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerPool = require('../../controllers/pool/Pool');

const router = express.Router();

router.get('/list', validarJWT, ControllerPool.list);
router.post('/insert', validarJWT, ControllerPool.insert);
router.put('/update', validarJWT, ControllerPool.update);
router.delete('/delete/:id', validarJWT, ControllerPool.delete);
router.post('/find', validarJWT, ControllerPool.listByID);
router.get('/findnid', validarJWT, ControllerPool.findNId)

module.exports = router;