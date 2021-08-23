const express = require('express');
const authController = require('../controllers/auth');
const authorize = require('../middleware/authorization-middleware');

const router = express.Router();

router.post('/login', authController.login);


module.exports = router;
