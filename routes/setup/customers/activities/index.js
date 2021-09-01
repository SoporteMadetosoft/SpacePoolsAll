/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/activities/index.js
    URI: '/setup/customers/activities' 
*/

const express = require('express');
const router = express.Router();

const ControllerActivities = require('../../../../controllers/setup/customers/Activities');

router.get('/list', ControllerActivities.list);
router.get('/select', ControllerActivities.select);
router.post('/insert', ControllerActivities.insert);
router.put('/update', ControllerActivities.update);
router.delete('/delete/:id', ControllerActivities.delete);
router.post('/find', ControllerActivities.listByID);

module.exports = router;
