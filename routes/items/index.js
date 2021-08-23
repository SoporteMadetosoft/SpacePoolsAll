const express = require('express');

const ControllerProductFamily = require('../../controllers/item/ProductFamily');
const ControllerItem = require('../../controllers/item/Item');


const router = express.Router();

router.get('/productFamily/list', ControllerProductFamily.list);
router.get('/productFamily/select', ControllerProductFamily.select);
router.post('/productFamily/insert', ControllerProductFamily.insert);
router.put('/productFamily/update', ControllerProductFamily.update);
router.delete('/productFamily/delete/:id', ControllerProductFamily.delete);
router.post('/productFamily/find', ControllerProductFamily.listByID);

router.get('/item/list', ControllerItem.list);
router.get('/item/select', ControllerItem.select);
router.post('/item/insert', ControllerItem.insert);
router.put('/item/update', ControllerItem.update);
router.delete('/item/delete/:id', ControllerItem.delete);
router.post('/item/find', ControllerItem.listByID);

module.exports = router;