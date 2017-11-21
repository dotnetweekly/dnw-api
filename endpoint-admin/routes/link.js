const express = require("express");
const router = express.Router();

const LinkController = require("../controllers/admin.link.controller");
const linkController = new LinkController();

router.get("/:id?", linkController.getItem);
router.post("/:id?", linkController.updateItem);

module.exports = router;
