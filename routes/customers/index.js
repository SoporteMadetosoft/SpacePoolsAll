/* 
    Path: @src/routes/setup/customers/index.js -> @src/routes/setup/customers/activities.js
    URI: '/customers/*'
*/ 

const express = require('express');
const Controller = require('../../controllers/customers/Customers.js');

const router = express.Router();

router.get('/list', Controller.list);
router.post('/find', Controller.listByID);
router.post('/insert', Controller.insert);
router.put('/update', Controller.update);
router.delete('/delete/:id', Controller.delete);
// router.post('/add', CustomersContControllerroller.add);


// router.post('/:idCustomer/centersList', Controller.customerCenterList);
// router.post('/:idCustomer/addressList', Controller.customerAddressList);
// router.post('/:idCustomer/contactsList', Controller.contactList);

module.exports = router;