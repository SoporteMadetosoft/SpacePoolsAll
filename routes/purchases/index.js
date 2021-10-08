
const express = require('express');

const ControllerPurchase = require('../../controllers/purchase/purchase');

const router = express.Router();

router.get('/list', ControllerPurchase.list);
router.post('/insert', ControllerPurchase.insert);
router.put('/update', ControllerPurchase.update);
router.put('/verify', ControllerPurchase.verify);
router.delete('/delete/:id', ControllerPurchase.delete);
router.post('/find', ControllerPurchase.listByID);
router.get('/findnid', ControllerPurchase.findNId)

module.exports = router;