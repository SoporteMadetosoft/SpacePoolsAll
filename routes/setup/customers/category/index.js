/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/category/index.js
    URI: '/setup/customers/category' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const router = express.Router();

const ControllerCategory = require('../../../../controllers/setup/customers/CustomerCategory');

router.get('/list', validarJWT, ControllerCategory.list);
router.post('/insert', validarJWT, ControllerCategory.insert);
router.put('/update', validarJWT, ControllerCategory.update);
router.delete('/delete/:id', validarJWT, ControllerCategory.delete);
router.post('/find', validarJWT, ControllerCategory.listByID);

module.exports = router;
