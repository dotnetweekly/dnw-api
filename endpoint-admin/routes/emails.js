const express = require('express');
const router = express.Router();

const EmailsController = require('../controllers/admin.emails.controller');
const emailsController = new EmailsController();

router.get('/newsletter/current', emailsController.currentNewsletter);

module.exports = router;
