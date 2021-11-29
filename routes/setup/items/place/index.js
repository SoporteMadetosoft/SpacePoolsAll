/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/items/place/index.js
    URI: '/setup/items/place' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const ControllerPlace = require('../../../../controllers/setup/items/Place');
const router = express.Router();

router.get('/list', validarJWT, ControllerPlace.list);
router.post('/insert', validarJWT, ControllerPlace.insert);
router.put('/update', validarJWT, ControllerPlace.update);
router.delete('/delete/:id', validarJWT, ControllerPlace.delete);
router.post('/find', validarJWT, ControllerPlace.listByID);

module.exports = router;
