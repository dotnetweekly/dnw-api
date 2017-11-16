const express = require("express");
const router = express.Router();

const LinkController = require("../controllers/admin.links.controller");
const linkController = new LinkController();

router.get("/", linkController.getAll);

module.exports = router;