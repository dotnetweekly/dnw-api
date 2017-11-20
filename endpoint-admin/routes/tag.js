const express = require("express");
const router = express.Router();

const TagController = require("../controllers/admin.tag.controller");
const tagController = new TagController();

router.get("/:id?", tagController.getItem);
router.post("/:id?", tagController.updateItem);

module.exports = router;
