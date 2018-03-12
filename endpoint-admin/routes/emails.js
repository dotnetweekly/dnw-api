const express = require('express');
const router = express.Router();

const EmailsController = require('../controllers/admin.emails.controller');
const emailsController = new EmailsController();

router.post('/newsletter/sendNewsletter', emailsController.sendNewsletter);
router.post('/newsletter/current', emailsController.currentNewsletter);
router.post('/custom', emailsController.sendCustom);
router.get('/user/activate', emailsController.activateUser);
router.get('/user/forgot-password', emailsController.forgotPassword);
router.get('/user/update-email', emailsController.updateEmail);

module.exports = router;
