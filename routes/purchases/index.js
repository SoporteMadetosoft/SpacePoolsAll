
const express = require('express');

const ControllerPurchase = require('../../controllers/purchase/purchase');
const ControllerItem = require('../../controllers/purchase/item');

const router = express.Router();

router.get('/purchase/list', ControllerPurchase.list);
router.post('/purchase/insert', ControllerPurchase.insert);
router.put('/purchase/update', ControllerPurchase.update);
router.delete('/purchase/delete/:id', ControllerPurchase.delete);
router.post('/purchase/find', ControllerPurchase.listByID);

router.get('/items/list', ControllerItem.list);
router.post('/items/insert', ControllerItem.insert);
router.put('/items/update', ControllerItem.update);
router.delete('/items/delete/:id', ControllerItem.delete);
router.post('/items/find', ControllerItem.listByID);

module.exports = router;