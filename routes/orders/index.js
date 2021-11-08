const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerOrder = require('../../controllers/order/Order');
const ControllerCustomerData = require('../../controllers/order/CustomerData');
const ControllerExtraItem = require('../../controllers/order/ExtraItem');

const router = express.Router();

router.get('/list', validarJWT, ControllerOrder.list);
router.post('/insert', validarJWT, ControllerOrder.insert);
router.put('/update', validarJWT, ControllerOrder.update);
router.delete('/delete/:id', validarJWT, ControllerOrder.delete);
router.post('/find', validarJWT, ControllerOrder.listByID);
router.get('/findnid', validarJWT, ControllerOrder.findNId)
router.put('/switchState', validarJWT, ControllerOrder.switchState);
router.post('/validate', validarJWT, ControllerOrder.validate);

router.get('/customerData/list', validarJWT, ControllerCustomerData.list);
router.post('/customerData/insert', validarJWT, ControllerCustomerData.insert);
router.put('/customerData/update', validarJWT, ControllerCustomerData.update);
router.delete('/customerData/delete/:id', validarJWT, ControllerCustomerData.delete);
router.post('/customerData/find', validarJWT, ControllerCustomerData.listByID);

router.get('/extraItems/list', validarJWT, ControllerExtraItem.list);
router.post('/extraItems/insert', validarJWT, ControllerExtraItem.insert);
router.put('/extraItems/update', validarJWT, ControllerExtraItem.update);
router.delete('/extraItems/delete/:id', validarJWT, ControllerExtraItem.delete);
router.post('/extraItems/find', validarJWT, ControllerExtraItem.listByID);

router.get('/canvas/list/:id', validarJWT, ControllerOrder.listCItems);


module.exports = router;