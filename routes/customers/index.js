/*
    Path:  @src/app.js ->  @src/routes/customers/index.js
    URI: '/customers' 
*/

const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const Controller = require('../../controllers/customers/Customers.js');

const router = express.Router();

router.get('/list', validarJWT, Controller.list);
router.post('/listFilter', validarJWT, Controller.listFilter);
router.post('/find', validarJWT, Controller.listByID);
router.post('/insert', validarJWT, Controller.insert);
router.put('/update', validarJWT, Controller.update);
router.delete('/delete/:id', validarJWT, Controller.delete);
router.get('/findnid', validarJWT, Controller.findNId);
router.get('/select', validarJWT, Controller.select);
module.exports = router;