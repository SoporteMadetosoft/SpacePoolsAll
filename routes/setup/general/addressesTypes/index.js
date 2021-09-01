/*
    Path:  @src/app.js ->  @src/routes/setup/general/addressesTypes/index.js
    URI: '/setup/general/addressesTypes' 
*/

const express = require('express');
const ControllerAT = require('../../../../controllers/setup/general/AddressesTypes');

const router = express.Router();

router.get('/list', ControllerAT.list);
router.get('/select', ControllerAT.select);
router.post('/insert', ControllerAT.insert);
router.put('/update', ControllerAT.update);
router.delete('/delete/:id', ControllerAT.delete);
router.post('/find', ControllerAT.listByID);

module.exports = router;
