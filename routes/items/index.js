const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerProductFamily = require('../../controllers/item/ProductFamily');
const ControllerItem = require('../../controllers/item/Item');


const router = express.Router();

router.get('/productFamily/list', validarJWT, ControllerProductFamily.list);
router.post('/productFamily/select', validarJWT, ControllerProductFamily.select);
router.post('/productFamily/insert', validarJWT, ControllerProductFamily.insert);
router.put('/productFamily/update', validarJWT, ControllerProductFamily.update);
router.delete('/productFamily/delete/:id', validarJWT, ControllerProductFamily.delete);
router.post('/productFamily/find', validarJWT, ControllerProductFamily.listByID);
router.get('/productFamily/findnid', validarJWT, ControllerProductFamily.findNId)

router.get('/item/list', validarJWT, ControllerItem.list);
//router.get('/item/selectByIdType', validarJWT, ControllerItem.selectByIdType)
router.post('/item/listItems', validarJWT, ControllerItem.listItems);
router.post('/item/insert', validarJWT, ControllerItem.insert);
router.put('/item/update', validarJWT, ControllerItem.update);
router.delete('/item/delete/:id', validarJWT, ControllerItem.delete);
router.post('/item/find', validarJWT, ControllerItem.listByID);
router.get('/item/findnid', validarJWT, ControllerItem.findNId)
router.get('/item/selectByIdItem/:id', validarJWT, ControllerItem.selectByIdItem);

module.exports = router;