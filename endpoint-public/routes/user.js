const express = require('express');
const Recaptcha = require('express-recaptcha');
const router = express.Router();

const Controller = require('../controllers/user.controller');
const userController = new Controller();

const recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC, process.env.RECAPTCHA_SECRET);

router.get('/profile', userController.profile);
router.get('/:username/submitted', userController.submitted);
router.get('/:username/upvotes', userController.upvotes);
router.get('/:username/comments', userController.comments);

router.post('/profile', recaptcha.middleware.verify, userController.saveProfile);
router.post('/updateEmail', recaptcha.middleware.verify, userController.updateEmail);
router.post('/forgotPassword', recaptcha.middleware.verify, userController.forgotPassword);

module.exports = router;
