/*
    Path:  @src/app.js ->  @src/routes/setup/general/taxes/index.js
    URI: '/setup/general/taxes' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const ControllerTax = require('../../../../controllers/setup/general/Tax');

const router = express.Router();

router.get('/list', validarJWT, ControllerTax.list);
router.post('/insert', validarJWT, ControllerTax.insert);
router.put('/update', validarJWT, ControllerTax.update);
router.delete('/delete/:id', validarJWT, ControllerTax.delete);
router.post('/find', validarJWT, ControllerTax.listByID);

module.exports = router;
