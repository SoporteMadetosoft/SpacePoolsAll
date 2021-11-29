/*
    Path: @src/routes/setup/index.js -> @src/routes/users/index.js
    URI: '/users' 
*/

const express = require('express');
const { validarJWT } = require('../../middleware/validarJWT');

const ControllerUser = require('../../controllers/user/User');

const router = express.Router();

router.get('/list', validarJWT, ControllerUser.list);
router.post('/insert', validarJWT, ControllerUser.insert);
router.put('/update', validarJWT, ControllerUser.update);
router.delete('/delete/:id', validarJWT, ControllerUser.delete);
router.post('/find', validarJWT, ControllerUser.listByID);
router.post('/checkUser', validarJWT, ControllerUser.checkUser);


module.exports = router;