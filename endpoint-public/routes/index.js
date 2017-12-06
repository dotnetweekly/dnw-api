const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/links', require('./links'));
router.use('/user', require('./user'));
router.use('/newsletters', require('./newsletters'));

module.exports = router;
