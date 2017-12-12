const express = require('express');
const router = express.Router();

const Controller = require('../controllers/auth.controller');
const controller = new Controller();

router.post('/register', controller.register);
router.post('/activate', controller.activate);
router.post('/login', controller.login);

module.exports = router;
