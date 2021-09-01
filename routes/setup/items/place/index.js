/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/items/place/index.js
    URI: '/setup/items/place' 
*/
const ControllerPlace = require('../../../../controllers/setup/items/Place');

const express = require('express');
const router = express.Router();

router.get('/list', ControllerPlace.list);
router.post('/insert', ControllerPlace.insert);
router.put('/update', ControllerPlace.update);
router.delete('/delete/:id', ControllerPlace.delete);
router.post('/find', ControllerPlace.listByID);

module.exports = router;
