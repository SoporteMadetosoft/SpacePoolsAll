/* 
    Path: @src/routes/setup/general/index.js -> @src/routes/setup/general/addressTypes.js
    URI: '/setup/general/addressTypes/*'
*/ 

const express = require('express');
const ControllerAT = require('../../../controllers/setup/general/AddressesTypes');
const ContollerPaymentMethod = require('../../../controllers/setup/general/PaymentMethod.js');
const ContollerDepartment = require('../../../controllers/setup/general/Department');

const router = express.Router();

router.get('/addressesTypes/list', ControllerAT.list);
router.get('/addressesTypes/select', ControllerAT.select);
router.post('/addressesTypes/insert', ControllerAT.insert);
router.put('/addressesTypes/update', ControllerAT.update);
router.delete('/addressesTypes/delete/:id', ControllerAT.delete);
router.post('/addressesTypes/find', ControllerAT.listByID);

router.get('/paymentMethod/list', ContollerPaymentMethod.list);
router.get('/paymentMethod/select', ContollerPaymentMethod.select);
router.post('/paymentMethod/insert', ContollerPaymentMethod.insert);
router.put('/paymentMethod/update', ContollerPaymentMethod.update);
router.delete('/paymentMethod/delete/:id', ContollerPaymentMethod.delete);
router.post('/paymentMethod/find', ContollerPaymentMethod.listByID);

router.get('/department/list', ContollerDepartment.list);
router.get('/department/select', ContollerDepartment.select);
router.post('/department/insert', ContollerDepartment.insert);
router.put('/department/update', ContollerDepartment.update);
router.delete('/department/delete/:id', ContollerDepartment.delete);
router.post('/department/find', ContollerDepartment.listByID);

module.exports = router;
