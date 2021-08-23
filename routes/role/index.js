
const express = require('express');

const ControllerRole = require('../../controllers/role/Role');

const router = express.Router();

router.get('/list', ControllerRole.list);
router.get('/select', ControllerRole.select);
router.post('/insert', ControllerRole.insert);
router.put('/update', ControllerRole.update);
router.delete('/delete/:id', ControllerRole.delete);
router.post('/find', ControllerRole.listByID);


module.exports = router;