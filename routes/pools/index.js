const express = require('express');

const ControllerPool = require('../../controllers/pool/Pool');

const router = express.Router();

router.get('/list', ControllerPool.list);
router.post('/insert', ControllerPool.insert);
router.put('/update', ControllerPool.update);
router.delete('/delete/:id', ControllerPool.delete);
router.post('/find', ControllerPool.listByID);
router.get('/findnid', ControllerPool.findNId)

module.exports = router;