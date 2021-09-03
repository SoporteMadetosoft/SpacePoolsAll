
const express = require('express');

const ControllerPurchase = require('../../controllers/purchase/purchase');
const ControllerItem = require('../../controllers/purchase/Item');

const router = express.Router();

router.get('/list', ControllerPurchase.list);
router.post('/insert', ControllerPurchase.insert);
router.put('/update', ControllerPurchase.update);
router.delete('/delete/:id', ControllerPurchase.delete);
router.post('/find', ControllerPurchase.listByID);

router.get('/items/list', ControllerItem.list);
router.post('/items/insert', ControllerItem.insert);
router.put('/items/update', ControllerItem.update);
router.delete('/items/delete/:id', ControllerItem.delete);
router.post('/items/find', ControllerItem.listByID);

module.exports = router;