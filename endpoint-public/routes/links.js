const express = require("express");
const router = express.Router();

const LinkController = require("../controllers/links.controller");
const linkController = new LinkController();

router.get("/", linkController.search);
router.post("/upvote/:id", linkController.upvote);
router.post("/downvote/:id", linkController.downvote);
router.post("/comment/:id", linkController.comment);
router.get("/:id", linkController.getSingle);

module.exports = router;
