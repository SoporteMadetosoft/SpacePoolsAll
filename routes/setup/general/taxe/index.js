const express = require('express');
const ControllerTax = require('../../../../controllers/setup/general/Tax');

const router = express.Router();

router.get('/list', ControllerTax.list);
router.post('/insert', ControllerTax.insert);
router.put('/update', ControllerTax.update);
router.delete('/delete/:id', ControllerTax.delete);
router.post('/find', ControllerTax.listByID);

module.exports = router;
