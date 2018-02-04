const express = require("express");
const Recaptcha = require('express-recaptcha');
const router = express.Router();

const LinkController = require("../controllers/links.controller");
const linkController = new LinkController();

const recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC, process.env.RECAPTCHA_SECRET);

router.get("/", linkController.search);
router.post("/", recaptcha.middleware.render, linkController.add);
router.post("/upvote/:id", linkController.upvote);
router.post("/downvote/:id", linkController.downvote);
router.post("/comment/:id", linkController.comment);
router.get("/:id", linkController.getSingle);

module.exports = router;
