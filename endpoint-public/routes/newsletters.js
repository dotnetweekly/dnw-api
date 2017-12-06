const express = require('express');
const router = express.Router();

const NewsletterController = require('../controllers/newsletter.controller');
const newsletterController = new NewsletterController();

router.get('/', newsletterController.search);

module.exports = router;
