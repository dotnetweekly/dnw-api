const express = require("express");
const router = express.Router();

const NewslettersController = require("../controllers/admin.newsletters.controller");
const newslettersController = new NewslettersController();

router.get("/", newslettersController.search);
router.delete("/", newslettersController.deleteItems);
router.post("/:key", newslettersController.updateItems);

module.exports = router;
