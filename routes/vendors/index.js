const express = require('express');

const ControllerContacts = require('../../controllers/vendor/Contacts');
const ControllerAddresses = require('../../controllers/vendor/Address');
const ControllerVendors = require('../../controllers/vendor/Vendor');

const router = express.Router();

router.get('/contact/list', ControllerContacts.list);
router.get('/contact/select', ControllerContacts.select);
router.post('/contact/insert', ControllerContacts.insert);
router.put('/contact/update', ControllerContacts.update);
router.delete('/contact/delete/:id', ControllerContacts.delete);
router.post('/contact/find', ControllerContacts.listByID);

router.get('/address/list', ControllerAddresses.list);
router.get('/address/select', ControllerAddresses.select);
router.post('/address/insert', ControllerAddresses.insert);
router.put('/address/update', ControllerAddresses.update);
router.delete('/address/delete/:id', ControllerAddresses.delete);
router.post('/address/find', ControllerAddresses.listByID);

router.get('/vendor/list', ControllerVendors.list);
router.get('/vendor/select', ControllerVendors.select);
router.post('/vendor/insert', ControllerVendors.insert);
router.put('/vendor/update', ControllerVendors.update);
router.delete('/vendor/delete/:id', ControllerVendors.delete);
router.post('/vendor/find', ControllerVendors.listByID);

module.exports = router;