/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/items/colors/index.js
    URI: '/setup/items/colors' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const ControllerColor = require('../../../../controllers/setup/items/Colors');
const router = express.Router();

router.get('/list', validarJWT, ControllerColor.list);
router.post('/insert', validarJWT, ControllerColor.insert);
router.put('/update', validarJWT, ControllerColor.update);
router.delete('/delete/:id', validarJWT, ControllerColor.delete);
router.post('/find', validarJWT, ControllerColor.listByID);

module.exports = router;
