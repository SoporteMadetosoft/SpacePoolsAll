const express = require('express');
const ControllerAlerts = require('../../controllers/alert/Alert');

const router = express.Router();

router.get('/list', ControllerAlerts.list);
router.get('/listNotification', ControllerAlerts.listNotification);
router.put('/update', ControllerAlerts.update);


module.exports = router;