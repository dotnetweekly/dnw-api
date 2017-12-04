const express = require('express');
const router = express.Router();

const Controller = require('../controllers/user.controller');
const userController = new Controller();

router.get('/profile', userController.profile);
router.get('/:username/submitted', userController.submitted);
router.get('/:username/upvotes', userController.upvotes);
router.get('/:username/comments', userController.comments);

module.exports = router;
