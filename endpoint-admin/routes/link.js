const express = require("express");
const router = express.Router();

const LinkController = require("../controllers/admin.link.controller");
const linkController = new LinkController();

router.post("/newsletter-sent", linkController.newsletterSent);
router.post("/newsletter-open", linkController.newsletterOpen);
router.post("/newsletter-click", linkController.newsletterClick);

router.get("/:id?", linkController.getItem);
router.post("/:id?", linkController.updateItem);

module.exports = router;
