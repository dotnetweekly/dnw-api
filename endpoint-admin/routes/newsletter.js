const express = require("express");
const router = express.Router();

const NewsletterController = require("../controllers/admin.newsletter.controller");
const newsletterController = new NewsletterController();

router.get("/:id?", newsletterController.getItem);
router.post("/:id?", newsletterController.updateItem);

module.exports = router;
