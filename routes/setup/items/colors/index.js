/*
    Path: @src/routes/setup/index.js -> @src/routes/setup/items/colors/index.js
    URI: '/setup/items/colors' 
*/
const ControllerColor = require('../../../../controllers/setup/items/Colors');

const express = require('express');
const router = express.Router();

router.get('/list', ControllerColor.list);
router.post('/insert', ControllerColor.insert);
router.put('/update', ControllerColor.update);
router.delete('/delete/:id', ControllerColor.delete);
router.post('/find', ControllerColor.listByID);

module.exports = router;
