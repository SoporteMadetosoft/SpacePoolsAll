const express = require('express');
const ControllerAlerts = require('../../controllers/alert/Alert');

const router = express.Router();

router.get('/list', ControllerAlerts.list);
router.get('/listNotification', ControllerAlerts.listNotification);


module.exports = router;