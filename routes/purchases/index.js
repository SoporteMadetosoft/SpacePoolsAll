
const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerPurchase = require('../../controllers/purchase/purchase');

const router = express.Router();

router.get('/list', validarJWT, ControllerPurchase.list);
router.post('/insert', validarJWT, ControllerPurchase.insert);
router.put('/update', validarJWT, ControllerPurchase.update);
router.put('/verify', validarJWT, ControllerPurchase.verify);
router.delete('/delete/:id', validarJWT, ControllerPurchase.delete);
router.post('/find', validarJWT, ControllerPurchase.listByID);
router.get('/findnid', validarJWT, ControllerPurchase.findNId)
router.get('/select', validarJWT, ControllerPurchase.select)

module.exports = router;