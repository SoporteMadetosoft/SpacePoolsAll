const express = require('express');

const ControllerOrder = require('../../controllers/order/Order');
const ControllerCustomerData = require('../../controllers/order/CustomerData');
const ControllerExtraItem = require('../../controllers/order/ExtraItem');

const router = express.Router();

router.get('/list', ControllerOrder.list);
router.post('/insert', ControllerOrder.insert);
router.put('/update', ControllerOrder.update);
router.delete('/delete/:id', ControllerOrder.delete);
router.post('/find', ControllerOrder.listByID);
router.get('/findnid', ControllerOrder.findNId)
router.put('/switchState', ControllerOrder.switchState);

router.get('/customerData/list', ControllerCustomerData.list);
router.post('/customerData/insert', ControllerCustomerData.insert);
router.put('/customerData/update', ControllerCustomerData.update);
router.delete('/customerData/delete/:id', ControllerCustomerData.delete);
router.post('/customerData/find', ControllerCustomerData.listByID);
router.get('/customerData/select', ControllerCustomerData.select)

router.get('/extraItems/list', ControllerExtraItem.list);
router.post('/extraItems/insert', ControllerExtraItem.insert);
router.put('/extraItems/update', ControllerExtraItem.update);
router.delete('/extraItems/delete/:id', ControllerExtraItem.delete);
router.post('/extraItems/find', ControllerExtraItem.listByID);

router.get('/canvas/list/:id', ControllerOrder.listCItems);


module.exports = router;