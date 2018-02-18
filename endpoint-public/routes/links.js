const express = require("express");
const Recaptcha = require('express-recaptcha');
const router = express.Router();

const LinkController = require("../controllers/links.controller");
const linkController = new LinkController();

const recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC, process.env.RECAPTCHA_SECRET);

router.get("/", linkController.search);
router.get("/:id", linkController.getSingle);

router.post("/", recaptcha.middleware.verify, linkController.add);
router.post("/upvote/:id", linkController.upvote);
router.post("/downvote/:id", linkController.downvote);
router.post("/comment/:id", recaptcha.middleware.verify, linkController.comment);

module.exports = router;
