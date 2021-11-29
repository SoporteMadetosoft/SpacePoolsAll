/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/activities/index.js
    URI: '/setup/customers/activities' 
*/

const express = require('express');
const { validarJWT } = require('../../../../middleware/validarJWT');

const router = express.Router();

const ControllerActivities = require('../../../../controllers/setup/customers/Activities');

router.get('/list', validarJWT, ControllerActivities.list);
router.post('/insert', validarJWT, ControllerActivities.insert);
router.put('/update', validarJWT, ControllerActivities.update);
router.delete('/delete/:id', validarJWT, ControllerActivities.delete);
router.post('/find', validarJWT, ControllerActivities.listByID);

module.exports = router;
