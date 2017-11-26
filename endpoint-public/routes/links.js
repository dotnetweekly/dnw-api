const express = require("express");
const router = express.Router();

const LinkController = require("../controllers/links.controller");
const linkController = new LinkController();

router.get("/", linkController.search);

module.exports = router;
