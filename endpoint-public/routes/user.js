const express = require('express');
const router = express.Router();

const Controller = require('../controllers/user.controller');
const userController = new Controller();

router.get('/profile', userController.profile);
router.get('/submitted', userController.submitted);
router.get('/upvotes', userController.upvotes);
router.get('/comments', userController.comments);

module.exports = router;
