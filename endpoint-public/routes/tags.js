const express = require("express");
const router = express.Router();

const TagController = require("../controllers/tags.controller");
const tagController = new TagController();

router.get("/", tagController.getTags);

module.exports = router;
