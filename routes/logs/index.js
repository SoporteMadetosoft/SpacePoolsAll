const express = require('express');
const ControllerLogs = require('../../controllers/logs/Logs');

const router = express.Router();

router.get('/list', ControllerLogs.list);
router.post('/insert', ControllerLogs.insert);
router.delete('/delete/:id', ControllerLogs.delete);

module.exports = router;