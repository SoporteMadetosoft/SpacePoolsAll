/*
    Path:  @src/app.js ->  @src/routes/setup/general/department/index.js
    URI: '/setup/general/department' 
*/

const express = require('express');
const ContollerDepartment = require('../../../../controllers/setup/general/Department');

const router = express.Router();

router.get('/list', ContollerDepartment.list);
router.post('/insert', ContollerDepartment.insert);
router.put('/update', ContollerDepartment.update);
router.delete('/delete/:id', ContollerDepartment.delete);
router.post('/find', ContollerDepartment.listByID);

module.exports = router;