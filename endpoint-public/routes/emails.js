const express = require('express');
const router = express.Router();

const EmailsController = require('../controllers/emails.controller');
const emailsController = new EmailsController();

router.get('/currentNewsletter', emailsController.currentNewsletter);
router.get('/sponsoredCount', emailsController.sponsoredCount);

module.exports = router;
