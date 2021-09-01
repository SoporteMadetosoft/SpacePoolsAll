
const express = require('express');

const ControllerUser = require('../../controllers/user/User');

const router = express.Router();

router.get('/list', ControllerUser.list);
router.post('/insert', ControllerUser.insert);
router.put('/update', ControllerUser.update);
router.delete('/delete/:id', ControllerUser.delete);
router.post('/find', ControllerUser.listByID);


module.exports = router;