/*
    Path:  @src/app.js ->  @src/routes/customers/index.js
    URI: '/customers' 
*/

const express = require('express');
const Controller = require('../../controllers/customers/Customers.js');

const router = express.Router();

router.get('/list', Controller.list);
router.post('/find', Controller.listByID);
router.post('/insert', Controller.insert);
router.put('/update', Controller.update);
router.delete('/delete/:id', Controller.delete);

module.exports = router;