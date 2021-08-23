/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/customers/index.js
    URI: '/setup/customers/*' 
*/

const express = require('express');
const router = express.Router();

const ControllerType = require('../../../controllers/setup/customers/CustomerType');
const ControllerCategory = require('../../../controllers/setup/customers/CustomerCategory');
const ControllerActivities = require('../../../controllers/setup/customers/Activities');
const ControllerOrigin = require('../../../controllers/setup/customers/Origin');


router.get('/type/list', ControllerType.list);
router.post('/type/insert', ControllerType.insert);
router.get('/type/select', ControllerType.select);
router.put('/type/update', ControllerType.update);
router.delete('/type/delete/:id', ControllerType.delete);
router.post('/type/find', ControllerType.listByID);

router.get('/category/list', ControllerCategory.list);
router.post('/category/insert', ControllerCategory.insert);
router.get('/category/select', ControllerCategory.select);
router.put('/category/update', ControllerCategory.update);
router.delete('/category/delete/:id', ControllerCategory.delete);
router.post('/category/find', ControllerCategory.listByID);


router.get('/activities/list', ControllerActivities.list);
router.get('/activities/select', ControllerActivities.select);
router.post('/activities/insert', ControllerActivities.insert);
router.put('/activities/update', ControllerActivities.update);
router.delete('/activities/delete/:id', ControllerActivities.delete);
router.post('/activities/find', ControllerActivities.listByID);


router.get('/origin/list', ControllerOrigin.list);
router.post('/origin/insert', ControllerOrigin.insert);
router.get('/origin/select', ControllerOrigin.select);
router.put('/origin/update', ControllerOrigin.update);
router.delete('/origin/delete/:id', ControllerOrigin.delete);
router.post('/origin/find', ControllerOrigin.listByID);


module.exports = router;
