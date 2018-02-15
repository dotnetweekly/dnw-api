const express = require("express");
const router = express.Router();

const TagController = require("../controllers/admin.tags.controller");
const tagController = new TagController();

router.get("/", tagController.search);
// router.delete("/", tagController.deleteItems);
// router.post("/:key", tagController.updateItems);

module.exports = router;
