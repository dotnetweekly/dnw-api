const express = require('express');
const router = express.Router();

const EmailsController = require('../controllers/admin.emails.controller');
const emailsController = new EmailsController();

router.post('/newsletter/current', emailsController.currentNewsletter);
router.get('/user/activate', emailsController.activateUser);
router.post('/custom', emailsController.sendCustom);

module.exports = router;
