/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/index.js
    URI: '/setup/customers/*' 
*/
const ControllerPlace = require('../../../controllers/setup/items/Place');

const express = require('express');
const router = express.Router();

router.get('/place/list', ControllerPlace.list);
router.get('/place/select', ControllerPlace.select);
router.post('/place/insert', ControllerPlace.insert);
router.put('/place/update', ControllerPlace.update);
router.delete('/place/delete/:id', ControllerPlace.delete);
router.post('/place/find', ControllerPlace.listByID);

module.exports = router;
