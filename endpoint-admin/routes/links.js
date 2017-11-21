const express = require("express");
const router = express.Router();

const LinkController = require("../controllers/admin.links.controller");
const linkController = new LinkController();

router.get("/", linkController.search);
router.delete("/", linkController.deleteItems);
router.post("/:key", linkController.updateItems);

module.exports = router;
