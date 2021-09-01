/*
    Path:  @src/app.js ->  @src/routes/setup/general/paymentMethod/index.js
    URI: '/setup/general/paymentMethod' 
*/

const express = require('express');
const ContollerPaymentMethod = require('../../../../controllers/setup/general/PaymentMethod.js');

const router = express.Router();

router.get('/list', ContollerPaymentMethod.list);
router.get('/select', ContollerPaymentMethod.select);
router.post('/insert', ContollerPaymentMethod.insert);
router.put('/update', ContollerPaymentMethod.update);
router.delete('/delete/:id', ContollerPaymentMethod.delete);
router.post('/find', ContollerPaymentMethod.listByID);

module.exports = router;
