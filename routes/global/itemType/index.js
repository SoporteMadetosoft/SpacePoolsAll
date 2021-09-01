/*
    Path:  @src/app.js ->  @src/routes/global/itemType/index.js
    URI: '/global/itemType 
*/

const express = require('express');
const ControllerItemType = require('../../../controllers/global/ItemType');

const router = express.Router();

router.get('/list', ControllerItemType.list);

module.exports = router;
